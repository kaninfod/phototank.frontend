import {
  requestTypes,
  createRequest,
  toQueryString } from './apiUtils';
import Immutable, { List, Map, fromJS, Set } from 'immutable';

// Reducer
var init = Map(fromJS({
  loadedAt: {
    bucket: false,
    taglist: false,
    photos: false,
  },
  snackBarMsg: '',
  bucket: [],
  photos: [],
  bucketCount: 0,
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
      if (!action.payload) { return state; }

      state = setPagination(state, action);
      state = loadPhotostoState(state, action);
      return setCacheTime(state, 'photos');
    }

    case 'DELETE_PHOTO_SUCCESS': {
      return deletePhotoInPhotos(state, fromJS(action));
    }

    case 'ADDTAG_PHOTO_SUCCESS':
    case 'REMOVETAG_PHOTO_SUCCESS':
    case 'COMMENT_PHOTO_SUCCESS':
    case 'LIKE_PHOTO_SUCCESS':
    case 'UNLIKE_PHOTO_SUCCESS': {
      console.log(action.payload);
      return updatePhotoInPhotos(state, action).set('photo', fromJS(action.payload.photo));
    }

    case 'GET_TAGLIST_PHOTO_SUCCESS': {
      if (!action.payload) { return state; }

      state = state.set('taglist', fromJS(action.payload.tags));
      return setCacheTime(state, 'taglist');
    }

    case 'FETCH_BUCKET_SUCCESS': {
      if (!action.payload) { return state; }

      state = state.set('bucketCount', action.payload.photos.length);
      state = state.set('bucket', fromJS(action.payload.photos));
      return setCacheTime(state, 'bucket');
    }

    case 'CLEAR_BUCKET_SUCCESS': {
      state = filterFacets(state, 'BucketFacet');
      return state.set('bucket', fromJS([])).set('bucketCount', 0);
    }

    case 'TOGGLE_PHOTOS_BUCKET_SUCCESS': {
      state = updatePhotoInPhotos(state, action);

      // state = updateBucket(state, fromJS(action));
      state = state.set('bucket', fromJS(action.payload.photos));
      return state.set('bucketCount', state.get('bucket').size);
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

function setCacheTime(state, cacheType) {
  return state.setIn(['loadedAt', cacheType], Date());
}

/**
 * updatePhotoInPhotos() updates / replaces a single photo within
 * the photos array in state
 */
function updatePhotoInPhotos(state, action) {

  function single(action, photo) {
    if (photo.get('id') === action.payload.photo.id) {
      return fromJS(action.payload.photo);
    } else {
      return photo;
    }
  }

  function multiple(action, photo) {
    let result = null;
    action.payload.photos.filter(bucketPhoto => {
      if (photo.get('id') === bucketPhoto.id) {
        result = fromJS(bucketPhoto);
      }
    });
    return result || photo;
  }

  const _photos = state.get('photos').map(photo => {
    if (Object.keys(action.payload)[0] == 'photo') {
      return single(action, photo);
    } else {
      return multiple(action, photo);
    }
  });

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

/*
  Get one or more photos with specific facets from collection of photos in state
*/
export function filterFacets(state, facetType) {

  function _filter(photo, facetType) {
    return photo.get('facets').filter(facet =>
      facet.get('type') != facetType
    );
  }

  const _photos = state.get('photos').map(photo =>
    photo.set('facets', _filter(photo, facetType))
  );

  return state.set('photos', _photos);
}

/**
 * updateBucket() updates a single photo within
 * the bucket array in state.
 */
function updateBucket(state, action) {
  const facet = getFacet('BucketFacet', action.getIn(['payload', 'photo'], []));

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

function loadPhotostoState(state, action) {
  if (state.getIn(['pagination', 'out_of_bounds'])) {
    return state;
  } else if (state.getIn(['pagination', 'first_page'])) {
    return state.set('photos', List(fromJS(action.payload.photos)));
  } else {
    const photos = unionPhotos(state.get('photos'), action);
    state = state.set('photos', List(photos));
    return limitPhotoArray(state);
  }
}

function setPagination(state, action) {
  const pagination = action.payload.meta;
  state = state
    .setIn(['pagination', 'total'],         pagination.total)
    .setIn(['pagination', 'total_pages'],   pagination.total_pages)
    .setIn(['pagination', 'first_page'],    pagination.first_page)
    .setIn(['pagination', 'last_page'],     pagination.last_page)
    .setIn(['pagination', 'previous_page'], pagination.previous_page)
    .setIn(['pagination', 'next_page'],     pagination.next_page)
    .setIn(['pagination', 'out_of_bounds'], pagination.out_of_bounds)
    .setIn(['pagination', 'offset'],        pagination.offset);
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
    url: '/api/photos/'.concat(photoId, '/like'),
    httpVerb: requestTypes.POST,
    params: null,
  };
}

export function unlikePhoto(photoId) {
  return {
    isAPI: true,
    type: 'UNLIKE_PHOTO',
    url: '/api/photos/'.concat(photoId, '/unlike'),
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

export function clearBucket() {
  return {
    isAPI: true,
    type: 'CLEAR_BUCKET',
    url: '/api/photos/bucket/clear',
    httpVerb: requestTypes.POST,
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
  const _action = {
    isAPI: true,
    type: 'FETCH_PHOTOS',
    url: photosGetUrl(payload),
    httpVerb: requestTypes.GET,
    params: null,
  };

  if (!payload.noCache) {
    _action.loadedAtIdentifier = ['nPhoto', 'loadedAt', 'photos'];
  }

  return _action;
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

/*
  Get facets from a single photo
*/
export function getFacet(facetType, photo) {
  if (Immutable.Iterable.isIterable(photo)) {
    const facets = photo.get('facets', []).filter(f =>
      f.get('type') == facetType
    );

    if (['LikeFacet', 'BucketFacet'].includes(facetType)) {
      return facets.get(0, false);
    }

    return facets;

  } else {
    return [];
  }
}
