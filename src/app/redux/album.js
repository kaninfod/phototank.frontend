import { requestTypes } from './apiUtils';
import { List, Map, fromJS } from 'immutable';

//actions
export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUM_SUCCESS = 'FETCH_ALBUM_SUCCESS';
export const REQUEST_ALBUM = 'REQUEST_ALBUM';
export const CREATE_ALBUM = 'CREATE_ALBUM';
export const CREATE_ALBUM_SUCCESS = 'CREATE_ALBUM_SUCCESS';
export const UPDATE_ALBUM = 'UPDATE_ALBUM';
export const UPDATE_ALBUM_SUCCESS = 'UPDATE_ALBUM_SUCCESS';
export const ADDPHOTO_ALBUM_REQUEST = 'ADDPHOTO_ALBUM_REQUEST';
export const ADDPHOTO_ALBUM_SUCCESS = 'ADDPHOTO_ALBUM_SUCCESS';
export const ADDBUCKET_ALBUM_REQUEST = 'ADDBUCKET_ALBUM_REQUEST';
export const ADDBUCKET_ALBUM_SUCCESS = 'ADDBUCKET_ALBUM_SUCCESS';
export const DELETE_ALBUM_REQUEST = 'DELETE_ALBUM_REQUEST';
export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS';

// Reducer
var init = Map(fromJS({
  albums: [],
  album: {
    start: null,
    end: null,
  },
}));

var newState = null;

export function reducer(state=init, action={}) {
  switch (action.type) {

    case FETCH_ALBUMS_SUCCESS: {
      newState = state.set('albums', fromJS(action.payload));
      return newState;
    }

    case FETCH_ALBUM_SUCCESS: {
      newState = state.set('album', fromJS(action.payload));
      return newState;
    }

    case CREATE_ALBUM_SUCCESS: {
      newState = state.set('album', fromJS(action.payload));
      return newState;
    }

    case UPDATE_ALBUM_SUCCESS: {
      return state.set('album', fromJS(action.payload));
    }

    case DELETE_ALBUM_SUCCESS: {
      const albums = state.get('albums').filter(album =>
        album.get('id') !== action.payload.id);
      return state.set('albums', albums);
    }
  }
  return state;
}

//API
export function fetchAlbums() {
  const apiPayload = {
    isAPI: true,
    type: 'FETCH_ALBUMS',
    url: '/api/albums',
    httpVerb: requestTypes.GET,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function fetchAlbum(id) {
  const apiPayload = {
    isAPI: true,
    type: 'FETCH_ALBUM',
    url: '/api/albums/'.concat(id),
    httpVerb: requestTypes.GET,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function createAlbum(payload) {
  const apiPayload = {
    isAPI: true,
    type: 'CREATE_ALBUM',
    url: '/api/albums/',
    httpVerb: requestTypes.POST,
    params: payload,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function updateAlbum(payload) {
  const apiPayload = {
    isAPI: true,
    type: 'UPDATE_ALBUM',
    url: '/api/albums/'.concat(payload.id),
    httpVerb: requestTypes.PUT,
    params: payload,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function addPhotoAlbum(payload) {
  const apiPayload = {
    isAPI: true,
    type: 'ADDPHOTO_ALBUM',
    url: '/api/albums/'.concat(payload.albumId, '/photo/', payload.photoId),
    httpVerb: requestTypes.PUT,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function addBucketAlbum(albumId) {
  const apiPayload = {
    isAPI: true,
    type: 'ADDBUCKET_ALBUM',
    url: '/api/albums/'.concat(albumId, '/bucket'),
    httpVerb: requestTypes.PUT,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function deleteAlbum(albumId) {
  const apiPayload = {
    isAPI: true,
    type: 'DELETE_ALBUM',
    url: '/api/photos/'.concat(albumId, '/comment/delete'),
    httpVerb: requestTypes.DELETE,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}
