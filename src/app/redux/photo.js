import {
  apiHandler,
  requestTypes,
  createRequest,
  responseHandler,
  notAuthorized,
  toQueryString } from './apiUtils';
import { List, Map, fromJS, Set } from 'immutable';
import * as bucketActions from './bucket';

//Actions
export const ADDTAG_PHOTO_REQUEST         = 'ADDTAG_PHOTO_REQUEST';
export const ADDTAG_PHOTO_SUCCESS         = 'ADDTAG_PHOTO_SUCCESS';
export const CLICK_PHOTO                  = 'CLICK_PHOTO';
export const COMMENT_PHOTO_REQUEST        = 'COMMENT_PHOTO_REQUEST';
export const COMMENT_PHOTO_SUCCESS        = 'COMMENT_PHOTO_SUCCESS';
export const DELETE_PHOTO_FULFILLED       = 'DELETE_PHOTO_FULFILLED';
export const DELETE_PHOTO_REQUEST         = 'DELETE_PHOTO_REQUEST';
export const FETCH_BUCKET_REQUEST         = 'FETCH_BUCKET_REQUEST';
export const FETCH_BUCKET_SUCCESS         = 'FETCH_BUCKET_SUCCESS';
export const FETCH_PHOTO_REQUEST          = 'FETCH_PHOTO_REQUEST';
export const FETCH_PHOTO_SUCCESS          = 'FETCH_PHOTO_SUCCESS';
export const FETCH_PHOTOS_REQUEST         = 'FETCH_PHOTOS_REQUEST';
export const FETCH_PHOTOS_SUCCESS         = 'FETCH_PHOTOS_SUCCESS';
export const GET_TAGLIST_PHOTO_REQUEST    = 'GET_TAGLIST_PHOTO_REQUEST';
export const GET_TAGLIST_PHOTO_SUCCESS    = 'GET_TAGLIST_PHOTO_SUCCESS';
export const LIKE_PHOTO_REQUEST           = 'LIKE_PHOTO_REQUEST';
export const LIKE_PHOTO_SUCCESS           = 'LIKE_PHOTO_SUCCESS';
export const REMOVETAG_PHOTO_REQUEST      = 'REMOVETAG_PHOTO_REQUEST';
export const REMOVETAG_PHOTO_SUCCESS      = 'REMOVETAG_PHOTO_SUCCESS';
export const ROTATE_BUCKET_PHOTO_REQUEST  = 'ROTATE_BUCKET_PHOTO_REQUEST';
export const ROTATE_BUCKET_PHOTO_SUCCESS  = 'ROTATE_BUCKET_PHOTO_SUCCESS';
export const ROTATE_PHOTO_REQUEST         = 'ROTATE_PHOTO_REQUEST';
export const ROTATE_PHOTO_SUCCESS         = 'ROTATE_PHOTO_SUCCESS';
export const SELECT_PHOTO_FULFILLED       = 'SELECT_PHOTO_FULFILLED';
export const SET_HEADER                   = 'SET_HEADER';
export const TOGGLE_PHOTOS_BUCKET_REQUEST = 'TOGGLE_PHOTOS_BUCKET_REQUEST';
export const TOGGLE_PHOTOS_BUCKET_SUCCESS = 'TOGGLE_PHOTOS_BUCKET_SUCCESS';

// Reducer
var init = Map(fromJS({
  photoData: [],
  bucket: [],
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
          .set('photoId', action.payload.id)
          .set('photoData', fromJS(action.payload));
    }

    case SET_HEADER:  return setPagination(state, action);

    case FETCH_PHOTOS_SUCCESS: {
      if (state.getIn(['pagination', 'out_of_bounds'])) {
        return state;
      }

      if (state.getIn(['pagination', 'first_page'])) {
        state = state.set('photos', List(fromJS(action.payload)));
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
      return state.set('photoData', fromJS(action.payload));
    }

    case LIKE_PHOTO_SUCCESS: {
      return state.set('photoData', fromJS(action.payload));
    }

    case ADDTAG_PHOTO_SUCCESS: {
      return state.set('photoData', fromJS(action.payload));
    }

    case REMOVETAG_PHOTO_SUCCESS: {
      return state.set('photoData', fromJS(action.payload));
    }

    case GET_TAGLIST_PHOTO_SUCCESS: {
      return state.set('taglist', fromJS(action.payload));
    }

    case FETCH_BUCKET_SUCCESS: {
      return state.set('bucket', fromJS(action.payload));
    }

    case TOGGLE_PHOTOS_BUCKET_SUCCESS: {
      const photos = state.get('photos').map(photo => {
        if (photo.get('id') === action.payload.id) {
          return fromJS(action.payload);
        } else {
          return photo;
        }
      });

      var bucket = [];
      if (action.payload.bucket) {
        bucket = state.get('bucket').push(fromJS(action.payload));
      } else {
        bucket = state.get('bucket').filter(
          photo => photo.get('id') !== action.payload.id
        );
      }

      return state.set('bucket', bucket).set('photos', photos);
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
  const newPhotos = fromJS(action.payload);
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
  return { type: FETCH_PHOTOS_REQUEST };
}

function fetchPhotosSuccess(data) {
  return { type: FETCH_PHOTOS_SUCCESS, payload: data };
}

export function setHeader(data) {
  return { type: SET_HEADER, payload: data };
}

export function clickPhoto(photoId) {
  return { type: CLICK_PHOTO, payload: { selectedPhoto: photoId, } };
}

function deletePhotoPending() {
  return { type: DELETE_PHOTO_REQUEST, };
}

function deletePhotoSuccess(data) {
  return { type: DELETE_PHOTO_FULFILLED, payload: data };
}

function fetchPhotoPending() {
  return { type: FETCH_PHOTO_REQUEST, };
}

function fetchPhotoSuccess(data) {
  return { type: FETCH_PHOTO_SUCCESS, payload: data };
}

function rotatePhotoPending() {
  return { type: ROTATE_PHOTO_REQUEST, };
}

function rotatePhotoSuccess(data) {
  return { type: ROTATE_PHOTO_SUCCESS, payload: data };
}

function rotateBucketPhotoPending() {
  return { type: ROTATE_BUCKET_PHOTO_REQUEST, };
}

function rotateBucketPhotoSuccess(data) {
  return { type: ROTATE_BUCKET_PHOTO_SUCCESS, payload: data };
}

function commentPhotoPending() {
  return { type: COMMENT_PHOTO_REQUEST, };
}

function commentPhotoSuccess(data) {
  return { type: COMMENT_PHOTO_SUCCESS, payload: data };
}

function likePhotoPending() {
  return { type: LIKE_PHOTO_REQUEST, };
}

function likePhotoSuccess(data) {
  return { type: LIKE_PHOTO_SUCCESS, payload: data };
}

function addTagPhotoPending() {
  return { type: ADDTAG_PHOTO_REQUEST, };
}

function addTagPhotoSuccess(data) {
  return { type: ADDTAG_PHOTO_SUCCESS, payload: data };
}

function removeTagPhotoPending() {
  return { type: REMOVETAG_PHOTO_REQUEST, };
}

function removeTagPhotoSuccess(data) {
  return { type: REMOVETAG_PHOTO_SUCCESS, payload: data };
}

function fetchTaglistPending() {
  return { type: GET_TAGLIST_PHOTO_REQUEST };
}

function fetchTaglistSuccess(data) {
  return { type: GET_TAGLIST_PHOTO_SUCCESS, payload: data };
}

function togglePhotosBucketPending() {
  return { type: TOGGLE_PHOTOS_BUCKET_REQUEST };
}

function togglePhotosBucketSuccess(data) {
  return { type: TOGGLE_PHOTOS_BUCKET_SUCCESS, payload: data };
}

function fetchBucketPending() {
  return { type: FETCH_BUCKET_REQUEST };
}

function fetchBucketSuccess(data) {
  return { type: FETCH_BUCKET_SUCCESS, payload: data };
}

//API
export function fetchPhoto(photoId) {
  const url = '/api/photos/'.concat(photoId);
  const requestType = requestTypes.GET;
  const params = null;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(fetchPhotoPending, fetchPhotoSuccess, request, dispatch);
  };
}

export function fetchBucket() {
  const url = '/api/photos/bucket';
  const requestType = requestTypes.GET;
  const params = null;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(fetchBucketPending, fetchBucketSuccess, request, dispatch);
  };
}

export function rotatePhoto(payload) {
  const url = '/api/photos/'.concat(payload.photoId, '/rotate/', payload.rotation);
  const requestType = requestTypes.GET;
  const params = null;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(rotatePhotoPending, rotatePhotoSuccess, request, dispatch);
  };
}

export function rotateBucketPhotos(payload) {
  const url = '/api/photos/bucket/rotate/'.concat(payload.rotation);
  const requestType = requestTypes.POST;
  const params = payload;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(rotateBucketPhotoPending, rotateBucketPhotoSuccess, request, dispatch);
  };
}

export function togglePhotosBucket(photoId) {
  const url = '/api/photos/'.concat(photoId, '/bucket/toggle');
  const requestType = requestTypes.POST;
  const params = null;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(togglePhotosBucketPending, togglePhotosBucketSuccess, request, dispatch);
  };
}

export function addTagPhoto(payload) {
  const url = '/api/photos/'.concat(payload.photoId, '/tag/add');
  const requestType = requestTypes.POST;
  const params = { tag: payload.name };
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(addTagPhotoPending, addTagPhotoSuccess, request, dispatch);
  };
}

export function removeTagPhoto(payload) {
  const url = '/api/photos/'.concat(payload.photoId, '/tag/delete');
  const requestType = requestTypes.DELETE;
  const params = { tag_id: payload.tagId }; //TODO change to tag_id
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(removeTagPhotoPending, removeTagPhotoSuccess, request, dispatch);
  };
}

export function fetchTaglist() {
  const url = '/api/photos/taglist';
  const requestType = requestTypes.GET;
  const params = null;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(fetchTaglistPending, fetchTaglistSuccess, request, dispatch);
  };
}

export function commentPhoto(payload) {
  const url = '/api/photos/'.concat(payload.photoId, '/comment/add');
  const requestType = requestTypes.POST;
  const params = { comment: payload.comment };
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(commentPhotoPending, commentPhotoSuccess, request, dispatch);
  };
}

export function uncommentPhoto(payload) {
  const url = '/api/photos/'.concat(payload.photoId, '/comment/delete');
  const requestType = requestTypes.DELETE;
  const params = { comment: payload.comment }; //TODO chenge to comment_id
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(commentPhotoPending, commentPhotoSuccess, request, dispatch);
  };
}

export function likePhoto(photoId) {
  const url = '/api/photos/'.concat(photoId, '/like/toggle');
  const requestType = requestTypes.POST;
  const params = null;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(likePhotoPending, likePhotoSuccess, request, dispatch);
  };
}

export function deletePhoto(photoId) {
  const url = '/api/photos/'.concat(photoId, '.json');
  const requestType = requestTypes.DELETE;
  const params = null;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(deletePhotoPending, deletePhotoSuccess, request, dispatch);
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
  if (response.
    status >= 200 && response.status < 300) {
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
