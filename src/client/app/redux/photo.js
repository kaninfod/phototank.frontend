import { createRequest, responseHandler, headers, notAuthorized, toQueryString } from './apiUtils';
import { List, Map, fromJS, Set } from 'immutable';
import * as bucketActions from './bucket';

//Actions
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const FETCH_PHOTOS_REQUEST = 'FETCH_PHOTOS_REQUEST';
export const SET_HEADER = 'SET_HEADER';
export const CLICK_PHOTO = 'CLICK_PHOTO';
export const SELECT_PHOTO_FULFILLED = 'SELECT_PHOTO_FULFILLED';
export const DELETE_PHOTO_REQUEST = 'DELETE_PHOTO_REQUEST';
export const DELETE_PHOTO_FULFILLED = 'DELETE_PHOTO_FULFILLED';
export const FETCH_PHOTO_REQUEST = 'FETCH_PHOTO_REQUEST';
export const FETCH_PHOTO_SUCCESS = 'FETCH_PHOTO_SUCCESS';
export const ROTATE_PHOTO_REQUEST = 'ROTATE_PHOTO_REQUEST';
export const ROTATE_PHOTO_SUCCESS = 'ROTATE_PHOTO_SUCCESS';
export const COMMENT_PHOTO_REQUEST = 'COMMENT_PHOTO_REQUEST';
export const COMMENT_PHOTO_SUCCESS = 'COMMENT_PHOTO_SUCCESS';
export const LIKE_PHOTO_REQUEST = 'LIKE_PHOTO_REQUEST';
export const LIKE_PHOTO_SUCCESS = 'LIKE_PHOTO_SUCCESS';
export const ADDTAG_PHOTO_REQUEST = 'ADDTAG_PHOTO_REQUEST';
export const ADDTAG_PHOTO_SUCCESS = 'ADDTAG_PHOTO_SUCCESS';
export const REMOVETAG_PHOTO_REQUEST = 'REMOVETAG_PHOTO_REQUEST';
export const REMOVETAG_PHOTO_SUCCESS = 'REMOVETAG_PHOTO_SUCCESS';

// Reducer
var init = Map(fromJS({
  photoData: [],
  hidden: false,
  photoId: null,
  photos: [],
  pagination: {
    total: 0,
    total_pages: 0,
    first_page: true,
    last_page: false,
    previous_page: null,
    next_page: 1,
    out_of_bounds: false,
    offset: 0,
  },
}));

var newState = null;

export function reducer(state=init, action={}) {
  switch (action.type) {

    case FETCH_PHOTO_SUCCESS: {
      return state
          .set('photoId', action.payload.photo.id)
          .set('photoData', fromJS(action.payload));
    }

    case SET_HEADER:  return setPagination(state, action);

    case FETCH_PHOTOS_SUCCESS: {
      if (state.getIn(['pagination', 'out_of_bounds'])) {
        return state;
      }

      if (state.getIn(['pagination', 'first_page'])) {
        state = state.set('photos', List(fromJS(action.payload.photos)));
      } else {
        const photos = unionPhotos(state.get('photos'), action);
        state = state.set('photos', List(photos));
        state = limitPhotoArray(state);
      }

      return state;
    }

    case DELETE_PHOTO_FULFILLED: {
      const photos = state.get('photos').filter(obj =>
         obj.get('id') != action.payload.photo_id
      );
      return state.set('photos', photos);
    }

    case COMMENT_PHOTO_SUCCESS: {
      return state.setIn(['photoData', 'photo', 'comments'], fromJS(action.payload.comments));
    }

    case LIKE_PHOTO_SUCCESS: {
      return state.setIn(['photoData', 'photo', 'like'], action.payload.liked_by_current_user);
    }

    case ADDTAG_PHOTO_SUCCESS: {
      return state.setIn(['photoData', 'photo', 'tags'], action.payload.tags);
    }

    case REMOVETAG_PHOTO_SUCCESS: {
      return state.setIn(['photoData', 'photo', 'tags'], action.payload.tags);
    }

    case bucketActions.TOGGLE_PHOTOS_BUCKET_SUCCESS: {
      const indexOfListToUpdate = state.get('photos').findIndex(listItem =>
        listItem.get('id') === parseInt(action.payload.photo_id)
      );
      const flag = state.getIn(['photos', indexOfListToUpdate, 'bucket']);
      const photos = state.setIn(['photos', indexOfListToUpdate, 'bucket'], !flag);
      return state.set('photos', photos.get('photos'));
    }
  }
  return state;
}

function limitPhotoArray(state) {
  if (state.get('photos').count() > 200) {
    var cut = state.get('photos');
    return state.set('photos', cut);
  }

  return state;
}

function unionPhotos(state, action) {
  const newPhotos = fromJS(action.payload.photos);
  return state.concat(newPhotos);
}

function setPagination(state, action) {
  const pagination = JSON.parse(action.payload.get('x-pagination'));
  state = state
    .setIn(['pagination',          'total'], pagination.total)
    .setIn(['pagination',    'total_pages'], pagination.total_pages)
    .setIn(['pagination',     'first_page'], pagination.first_page)
    .setIn(['pagination',      'last_page'], pagination.last_page)
    .setIn(['pagination',  'previous_page'], pagination.previous_page)
    .setIn(['pagination',      'next_page'], pagination.next_page)
    .setIn(['pagination',  'out_of_bounds'], pagination.out_of_bounds)
    .setIn(['pagination',         'offset'], pagination.offset);
  return state;
}

// Action Creators
function requestPhotos() {
  return {
    type: FETCH_PHOTOS_REQUEST,
  };
}

function fetchPhotosSuccess(data) {
  return {
    type: FETCH_PHOTOS_SUCCESS, payload: data,
  };
}

function setHeader(data) {
  return { type: SET_HEADER, payload: data };
}

export function clickPhoto(photoId) {
  return { type: CLICK_PHOTO, payload: { selectedPhoto: photoId, } };
}

export function deletePhotoPending() {
  return { type: DELETE_PHOTO_REQUEST, };
}

function deletePhotoSuccess(data) {
  return { type: DELETE_PHOTO_FULFILLED, payload: data };
}

export function fetchPhotoPending() {
  return { type: FETCH_PHOTO_REQUEST, };
}

function fetchPhotoSuccess(data) {
  return { type: FETCH_PHOTO_SUCCESS, payload: data };
}

export function rotatePhotoPending() {
  return { type: ROTATE_PHOTO_REQUEST, };
}

function rotatePhotoSuccess(data) {
  return { type: ROTATE_PHOTO_SUCCESS, payload: data };
}

export function commentPhotoPending() {
  return { type: COMMENT_PHOTO_REQUEST, };
}

function commentPhotoSuccess(data) {
  return { type: COMMENT_PHOTO_SUCCESS, payload: data };
}

export function likePhotoPending() {
  return { type: LIKE_PHOTO_REQUEST, };
}

function likePhotoSuccess(data) {
  return { type: LIKE_PHOTO_SUCCESS, payload: data };
}

export function addTagPhotoPending() {
  return { type: ADDTAG_PHOTO_REQUEST, };
}

function addTagPhotoSuccess(data) {
  return { type: ADDTAG_PHOTO_SUCCESS, payload: data };
}

export function removeTagPhotoPending() {
  return { type: REMOVETAG_PHOTO_REQUEST, };
}

function removeTagPhotoSuccess(data) {
  return { type: REMOVETAG_PHOTO_SUCCESS, payload: data };
}

//API
export function fetchPhoto(photoId) {
  const url = '/api/photos/'.concat(photoId, '.json');
  return dispatch => {

    dispatch(fetchPhotoPending());

    fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response, dispatch))
    .then(data => dispatch(fetchPhotoSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}

export function rotatePhoto(payload) {
  const url = '/api/photos/'.concat(payload.photoId, '/rotate/', payload.rotation);
  return dispatch => {

    dispatch(rotatePhotoPending());

    fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response, dispatch))
    .then(data => dispatch(rotatePhotoSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}

export function addTagPhoto(payload) {
  const url = '/api/photos/'.concat(payload.photoId, '/addtag?name=', payload.name);
  return dispatch => {

    dispatch(addTagPhotoPending());

    fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response, dispatch))
    .then(data => dispatch(addTagPhotoSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}

export function removeTagPhoto(payload) {
  const url = '/api/photos/'.concat(payload.photoId, '/removetag?name=', payload.name);
  return dispatch => {

    dispatch(removeTagPhotoPending());

    fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response, dispatch))
    .then(data => dispatch(removeTagPhotoSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}

export function commentPhoto(payload) {
  const url = '/api/photos/'.concat(payload.photoId, '/add_comment');
  return dispatch => {

    dispatch(commentPhotoPending());

    fetch(createRequest('POST', url, { comment: payload.comment }))
    .then(response => responseHandler(response, dispatch))
    .then(data => dispatch(commentPhotoSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}

export function likePhoto(photoId) {
  const url = '/api/photos/'.concat(photoId, '/like');
  return dispatch => {

    dispatch(likePhotoPending());

    fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response, dispatch))
    .then(data => dispatch(likePhotoSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}

export function deletePhoto(photoId) {
  const url = '/api/photos/' + photoId + '.json';
  return dispatch => {

    dispatch(deletePhotoPending());

    fetch(createRequest('DELETE', url, null))
    .then(response => responseHandler(response, dispatch))
    .then(data => dispatch(deletePhotoSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}

export function fetchPhotos(payload) {
  return dispatch => {
    dispatch(requestPhotos());

    const request = photosGetRequest(payload, dispatch);
    fetch(request)
    .then(response => photosResponseHandler(response, dispatch))
    .then(data => dispatch(fetchPhotosSuccess(data)))
    .catch(err => err);
  };
}

//Utility functions, mainly for fetchPhotos
function photosResponseHandler(response, dispatch) {
  if (response.status >= 200 && response.status < 300) {
    dispatch(setHeader(response.headers));
    return response.json();
  } else if (response.status == 401) {
    const error = new Error(response.statusText);
    error.response = response;
    dispatch(notAuthorized());
    throw error;
  }
}

function photosGetRequest(payload) {
  var url;
  switch (payload.context) {
    case 'catalog':
      url = '/api/catalogs/'.concat(payload.contextId, '/photos.json?page=', payload.page);
      break;
    case 'album':
      url = '/api/albums/'.concat(payload.contextId, '/photos?page=', payload.page);
      break;
    default:
      url = '/api/photos.json';
      var params = toQueryString(payload.searchParams);
      url = url.concat('?', params, '&page=', payload.page);
      break;
  }

  return createRequest('GET', url, null);
}
