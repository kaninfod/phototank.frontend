import {
  // apiActionHandler,
  requestTypes,
  createRequest,
  notAuthorized,
  toQueryString } from './apiUtils';
import { List, Map, fromJS, Set } from 'immutable';

//Actions
export const ADDTAG_PHOTO         = 'ADDTAG_PHOTO';
// export const CLICK_PHOTO          = 'CLICK_PHOTO';
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
  bucket: [],
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

    case 'DELETE_PHOTO_SUCCESS': {
      return deletePhotoInPhotos(state, fromJS(action));
    }

    case 'ADDTAG_PHOTO_SUCCESS':
    case 'REMOVETAG_PHOTO_SUCCESS':
    case 'COMMENT_PHOTO_SUCCESS':
    case 'LIKE_PHOTO_SUCCESS': {
      return updatePhotoInPhotos(state, fromJS(action));
    }

    case 'GET_TAGLIST_PHOTO_SUCCESS': {
      return state.set('taglist', fromJS(action.payload));
    }

    case 'FETCH_BUCKET_SUCCESS': {
      return state.set('bucket', fromJS(action.payload));
    }

    case 'TOGGLE_PHOTOS_BUCKET_SUCCESS': {
      state = updatePhotoInPhotos(state, fromJS(action));
      return updateBucket(state, fromJS(action));
    }

    case 'LIKE_PHOTOS_BUCKET_SUCCESS': {
      action.payload.forEach(item => {
        const _action = fromJS({ payload: item });
        state = updatePhotoInPhotos(state, _action);
      });
      return state;
    }
  }
  return state;
}

// Utility functions for reducer

/**
 * updatePhotoInPhotos() updates / replaces a single photo within
 * the photos array in state
 */
function updatePhotoInPhotos(state, action) {
  const _photos = state.get('photos').map(photo =>
    photo.get('id') === action.getIn(['payload', 'id']) ? action.get('payload') : photo
  );
  return state.set('photos', _photos);
}

/**
 * deletePhotoInPhotos() removes a single photo within
 * the photos array in state
 */
function deletePhotoInPhotos(state, action) {
  const photos = state.get('photos').filter(obj =>
     obj.get('id') != action.getIn(['payload', 'id']) //action.payload.photo_id
  );
  return state.set('photos', photos);
}

/**
 * updatePhotoInPhotos() updates/replaces a single photo within
 * the photos array in state
 */
function updatePhotoInPhotos(state, action) {
  const _photos = state.get('photos').map(photo =>
    photo.get('id') === action.getIn(['payload', 'id']) ? action.get('payload') : photo
  );
  return state.set('photos', _photos);
}

/**
 * updateBucket() updates a single photo within
 * the bucket array in state.
 */
function updateBucket(state, action) {
  const facet = action.getIn(['payload', 'facets'], []).filter(f =>
    f.get('type') == 'Bucket'
  ).get(0);

  let bucket = [];
  if (!!facet) {
    bucket = state.get('bucket').push(action.get('payload'));
  } else {
    bucket = state.get('bucket').filter(
      photo => photo.get('id') !== action.getIn(['payload', 'id'])
    );
  }

  return state.set('bucket', bucket);
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

// Single photo actions
export function fetchPhoto(photoId) {
  return {
    isAPI: true,
    type: 'FETCH_PHOTO',
    url: '/api/photos/'.concat(photoId),
    httpVerb: requestTypes.GET,
    params: null,
  };
}

export function rotatePhoto(payload) {
  return {
    isAPI: true,
    type: 'ROTATE_PHOTO',
    url: '/api/photos/'.concat(payload.photoId, '/rotate/', payload.rotation),
    httpVerb: requestTypes.GET,
    params: null,
  };
}

export function addTagPhoto(payload) {
  return {
    isAPI: true,
    type: 'ADDTAG_PHOTO',
    url: '/api/photos/'.concat(payload.photoId, '/tag/add'),
    httpVerb: requestTypes.POST,
    params: { tag: payload.name },
  };
}

export function removeTagPhoto(payload) {
  return {
    isAPI: true,
    type: 'REMOVETAG_PHOTO',
    url: '/api/photos/'.concat(payload.photoId, '/tag/delete'),
    httpVerb: requestTypes.DELETE,
    params: { tag_id: payload.tagId },
  };
}

export function fetchTaglist() {
  return {
    isAPI: true,
    type: 'GET_TAGLIST_PHOTO',
    url: '/api/photos/taglist',
    httpVerb: requestTypes.GET,
    params: null,
  };
}

export function commentPhoto(payload) {
  return {
    isAPI: true,
    type: 'COMMENT_PHOTO',
    url: '/api/photos/'.concat(payload.photoId, '/comment/add'),
    httpVerb: requestTypes.POST,
    params: { comment: payload.comment },
  };
}

export function uncommentPhoto(payload) {
  return {
    isAPI: true,
    type: 'UNCOMMENT_PHOTO',
    url: '/api/photos/'.concat(payload.photoId, '/comment/delete'),
    httpVerb: requestTypes.DELETE,
    params: { comment: payload.comment },
  };
}

export function likePhoto(photoId) {
  return {
    isAPI: true,
    type: 'LIKE_PHOTO',
    url: '/api/photos/'.concat(photoId, '/like/toggle'),
    httpVerb: requestTypes.POST,
    params: null,
  };
}

export function deletePhoto(photoId) {
  return {
    isAPI: true,
    type: 'DELETE_PHOTO',
    url: '/api/photos/'.concat(photoId),
    httpVerb: requestTypes.DELETE,
    params: null,
  };
}

// Bucket actions

export function fetchBucket() {
  return {
    isAPI: true,
    type: 'FETCH_BUCKET',
    url: '/api/photos/bucket',
    httpVerb: requestTypes.GET,
    params: null,
  };
}


export function rotateBucketPhotos(payload) {
  return {
    isAPI: true,
    type: 'ROTATE_BUCKET_PHOTO',
    url: '/api/photos/bucket/rotate/'.concat(payload.rotation),
    httpVerb: requestTypes.POST,
    params: payload,
  };
}

export function togglePhotosBucket(photoId) {
  return {
    isAPI: true,
    type: 'TOGGLE_PHOTOS_BUCKET',
    url: '/api/photos/'.concat(photoId, '/bucket/toggle'),
    httpVerb: requestTypes.POST,
    params: null,
  };
}

export function likePhotosBucket(photoIds) {
  return {
    isAPI: true,
    type: 'LIKE_PHOTOS_BUCKET',
    url: '/api/photos/bucket/like',
    httpVerb: requestTypes.POST,
    params: { photoIds: photoIds, },
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
