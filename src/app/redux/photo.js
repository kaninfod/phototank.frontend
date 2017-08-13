import {
  // apiActionHandler,
  requestTypes,
  createRequest,
  notAuthorized,
  toQueryString } from './apiUtils';
import { List, Map, fromJS, Set } from 'immutable';

//Actions
export const ADDTAG_PHOTO         = 'ADDTAG_PHOTO';
export const CLICK_PHOTO          = 'CLICK_PHOTO';
export const COMMENT_PHOTO        = 'COMMENT_PHOTO';
export const DELETE_PHOTO         = 'DELETE_PHOTO';
export const FETCH_BUCKET         = 'FETCH_BUCKET';
export const FETCH_PHOTO          = 'FETCH_PHOTO';
export const FETCH_PHOTOS_REQUEST = 'FETCH_PHOTOS';
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const GET_TAGLIST_PHOTO    = 'GET_TAGLIST_PHOTO';
export const LIKE_PHOTO           = 'LIKE_PHOTO';
export const REMOVETAG_PHOTO      = 'REMOVETAG_PHOTO';
export const ROTATE_BUCKET_PHOTO  = 'ROTATE_BUCKET_PHOTO';
export const ROTATE_PHOTO         = 'ROTATE_PHOTO';
export const SET_HEADER           = 'SET_HEADER';
export const TOGGLE_PHOTOS_BUCKET = 'TOGGLE_PHOTOS_BUCKET';

// Reducer
var init = Map(fromJS({
  stale: {},
  bucket: [],
  photos: [],
  photo: [],
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

    // case 'FETCH_PHOTO_SUCCESS': {
    //
    //   return state
    //       .set('photoId', action.payload.id)
    //       .set('photoData', fromJS(action.payload));
    // }

    case 'SET_HEADER':  return setPagination(state, action);

    case 'FETCH_PHOTOS_SUCCESS': {
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

    case 'CLICK_PHOTO': {
      return state.set('photo', action.payload);
    }

    case 'DELETE_PHOTO_SUCCESS': {
      const photos = state.get('photos').filter(obj =>
         obj.get('id') != action.payload.photo_id
      );
      return state.set('photos', photos);
    }

    // case 'COMMENT_PHOTO_SUCCESS': {
    //   return state.set('photoData', fromJS(action.payload));
    // }

    case 'ADDTAG_PHOTO_SUCCESS':
    case 'REMOVETAG_PHOTO_SUCCESS':
    case 'COMMENT_PHOTO_SUCCESS':
    case 'LIKE_PHOTO_SUCCESS': {
      return setPhoto(state, action);
    }

    // case 'ADDTAG_PHOTO_SUCCESS': {
    //   return state.set('photoData', fromJS(action.payload));
    // }

    // case 'REMOVETAG_PHOTO_SUCCESS': {
    //   return state.set('photoData', fromJS(action.payload));
    // }

    case 'GET_TAGLIST_PHOTO_SUCCESS': {
      return state
        .set('taglist', fromJS(action.payload));

    }

    case 'FETCH_BUCKET_SUCCESS': {
      return state.set('bucket', fromJS(action.payload));
    }

    case 'TOGGLE_PHOTOS_BUCKET_SUCCESS': {
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

// Utility functions for reducer
function setPhoto(state, action) {
  const indexOfListToUpdate = state.get('photos').findIndex(photo =>
    photo.get('id') === action.payload.id
  );

  return state
    .set('photo', fromJS(action.payload))
    .setIn(['photos', indexOfListToUpdate], fromJS(action.payload));
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
    .setIn(['pagination', 'total'], pagination.total)
    .setIn(['pagination', 'total_pages'], pagination.total_pages)
    .setIn(['pagination', 'first_page'], pagination.first_page)
    .setIn(['pagination', 'last_page'], pagination.last_page)
    .setIn(['pagination', 'previous_page'], pagination.previous_page)
    .setIn(['pagination', 'next_page'], pagination.next_page)
    .setIn(['pagination', 'out_of_bounds'], pagination.out_of_bounds)
    .setIn(['pagination', 'offset'], pagination.offset);
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

// export function clickPhoto(photoId) {
//   return { type: CLICK_PHOTO, payload: { selectedPhoto: photoId, } };
// }

//API
export function fetchPhoto(photoId) {
  const apiPayload = {
    isAPI: true,
    type: 'FETCH_PHOTO',
    url: '/api/photos/'.concat(photoId),
    httpVerb: requestTypes.GET,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function fetchBucket() {
  const apiPayload = {
    isAPI: true,
    type: 'FETCH_BUCKET',
    url: '/api/photos/bucket',
    httpVerb: requestTypes.GET,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function rotatePhoto(payload) {
  const apiPayload = {
    isAPI: true,
    type: 'ROTATE_PHOTO',
    url: '/api/photos/'.concat(payload.photoId, '/rotate/', payload.rotation),
    httpVerb: requestTypes.GET,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function rotateBucketPhotos(payload) {
  const apiPayload = {
    isAPI: true,
    type: 'ROTATE_BUCKET_PHOTO',
    url: '/api/photos/bucket/rotate/'.concat(payload.rotation),
    httpVerb: requestTypes.POST,
    params: payload,
  };

  return dispatch => {
    dispatch(apiPayload);
    apiActionHandler(apiPayload);
  };
}

export function togglePhotosBucket(photoId) {
  const apiPayload = {
    isAPI: true,
    type: 'TOGGLE_PHOTOS_BUCKET',
    url: '/api/photos/'.concat(photoId, '/bucket/toggle'),
    httpVerb: requestTypes.POST,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function addTagPhoto(payload) {
  const apiPayload = {
    isAPI: true,
    type: 'ADDTAG_PHOTO',
    url: '/api/photos/'.concat(payload.photoId, '/tag/add'),
    httpVerb: requestTypes.POST,
    params: { tag: payload.name },
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function removeTagPhoto(payload) {
  const apiPayload = {
    isAPI: true,
    type: 'REMOVETAG_PHOTO',
    url: '/api/photos/'.concat(payload.photoId, '/tag/delete'),
    httpVerb: requestTypes.DELETE,
    params: { tag_id: payload.tagId },
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function fetchTaglist() {
  const apiPayload = {
    isAPI: true,
    type: 'GET_TAGLIST_PHOTO',
    url: '/api/photos/taglist',
    httpVerb: requestTypes.GET,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function commentPhoto(payload) {
  const apiPayload = {
    isAPI: true,
    type: 'COMMENT_PHOTO',
    url: '/api/photos/'.concat(payload.photoId, '/comment/add'),
    httpVerb: requestTypes.POST,
    params: { comment: payload.comment },
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function uncommentPhoto(payload) {
  const apiPayload = {
    isAPI: true,
    type: 'UNCOMMENT_PHOTO',
    url: '/api/photos/'.concat(payload.photoId, '/comment/delete'),
    httpVerb: requestTypes.DELETE,
    params: { comment: payload.comment },
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function likePhoto(photoId) {
  const apiPayload = {
    isAPI: true,
    type: 'LIKE_PHOTO',
    url: '/api/photos/'.concat(photoId, '/like/toggle'),
    httpVerb: requestTypes.POST,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function deletePhoto(photoId) {
  const apiPayload = {
    isAPI: true,
    type: 'DELETE_PHOTO',
    url: '/api/photos/'.concat(photoId),
    httpVerb: requestTypes.DELETE,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
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
