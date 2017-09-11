import {
  responseHandler,
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
  loadedAt: {
    bucket: false,
    taglist: false,
    photos: false,
  },
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

    // case 'SET_HEADER':  return setPagination(state, action);
    case 'FETCH_PHOTO_SUCCESS': {
      return state.set('photo', fromJS(action.payload.photos[0]));

    }

    case 'FETCH_PHOTOS_SUCCESS': {
      if (!action.payload) { return state; };

      state = setPagination(state, action);

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

      state = state.setIn(['loadedAt', 'photos'], Date());
      return state;
    }

    case 'DELETE_PHOTO_SUCCESS': {
      return deletePhotoInPhotos(state, fromJS(action));
    }

    case 'ADDTAG_PHOTO_SUCCESS':
    case 'REMOVETAG_PHOTO_SUCCESS':
    case 'COMMENT_PHOTO_SUCCESS':
    case 'LIKE_PHOTO_SUCCESS': {
      return updatePhotoInPhotos(state, fromJS(action)).set('photo', fromJS(action.payload.photo));
    }

    case 'GET_TAGLIST_PHOTO_SUCCESS': {
      if (!action.payload) { return state; };
      state = state.set('taglist', fromJS(action.payload.tags));
      return state.setIn(['loadedAt', 'taglist'], Date());
    }

    case 'FETCH_BUCKET_SUCCESS': {
      if (!action.payload) { return state; };
      state = state.set('bucket', fromJS(action.payload.photos));
      return state.setIn(['loadedAt', 'bucket'], Date());
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

    case 'SHOW_PANEL': {
      return panelDataprovider(state, action);
    }
  }
  return state;
}

// Utility functions for reducer

/**
 * panelDataprovider() provides data for widgets in the slide in panel
 *
 */
function panelDataprovider(state, action) {
  switch (action.payload.widget) {
    case 'PHOTO_INFO': {
      const index = state.get('photos').findIndex(p => p.get('id') == action.payload.photoId);
      return state.setIn(['photo'], state.getIn(['photos', index]));
    }

    default: {
      return state;
    }

  }
}

/**
 * updatePhotoInPhotos() updates / replaces a single photo within
 * the photos array in state
 */
function updatePhotoInPhotos(state, action) {
  const _photos = state.get('photos').map(photo =>
    photo.get('id') === action.getIn(['payload', 'photo', 'id']) ? action.getIn(['payload', 'photo']) : photo
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
 * updateBucket() updates a single photo within
 * the bucket array in state.
 */
function updateBucket(state, action) {

  const facet = action.getIn(['payload', 'photo', 'facets'], []).filter(f =>
    f.get('type') == 'Bucket'
  ).get(0);

  let bucket = [];
  if (!!facet) {
    bucket = state.get('bucket').push(action.getIn(['payload', 'photo']));
  } else {
    bucket = state.get('bucket').filter(
      photo => photo.get('id') !== action.getIn(['payload', 'photo', 'id'])
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
  const newPhotos = fromJS(action.payload.photos);
  return state.concat(newPhotos);
}

function setPagination(state, action) {
  const pagination = action.payload.meta;
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
function requestPhotos(payload) {
  return { type: FETCH_PHOTOS_REQUEST, payload };
}

function fetchPhotosSuccess(data) {
  return { type: FETCH_PHOTOS_SUCCESS, payload: data };
}

export function setHeader(data) {
  return { type: SET_HEADER, payload: data };
}

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
    url: '/api/photos/'.concat(payload.photoId, '/rotate/'),
    httpVerb: requestTypes.POST,
    params: { degrees: payload.degrees },
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
    loadedAtIdentifier: ['nPhoto', 'loadedAt', 'taglist'],
  };
}

export function photoAlbumAdd(payload) {
  return {
    isAPI: true,
    type: 'ALBUMADD_PHOTO',
    url: '/api/photos/'.concat(payload.photoId, '/add_to_album'),
    httpVerb: requestTypes.POST,
    params: { album_id: payload.albumId },
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
    loadedAtIdentifier: ['nPhoto', 'loadedAt', 'bucket'],
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
  return {
    isAPI: true,
    type: 'FETCH_PHOTOS',
    url: photosGetUrl(payload),
    httpVerb: requestTypes.GET,
    params: null,
    loadedAtIdentifier: ['nPhoto', 'loadedAt', 'photos'],
  };
}

export function fetchMorePhotos(payload) {
  return {
    isAPI: true,
    type: 'FETCH_PHOTOS',
    url: photosGetUrl(payload),
    httpVerb: requestTypes.GET,
    params: null,
    // loadedAtIdentifier: ['nPhoto', 'loadedAt', 'photos'],
  };
}


function photosGetUrl(payload) {
  switch (payload.context) {
    case 'catalog':
      return '/api/catalogs/'.concat(payload.contextId, '/photos?page=', payload.page);
    case 'album':
      return '/api/albums/'.concat(payload.contextId, '/photos?page=', payload.page);
    default:
      const params = toQueryString(payload.searchParams);
      return '/api/photos'.concat('?', params, '&page=', payload.page);
  }
}

export function getPhoto(photoId, context) {
  const index = context.photos.findIndex(p => p.get('id') == parseInt(photoId));
  return context.photos.get(index);
}

export function getFacet(type, photo) {
  if (photo) {
    const facets = photo.get('facets', []).filter(f =>
      f.get('type') == type
    );

    if (['LikeFacet', 'BucketFacet'].includes(type)) {
      return facets.get(0, null);
    }

    return facets;
  }
}
