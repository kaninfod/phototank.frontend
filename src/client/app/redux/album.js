import { apiHandler, createRequest, requestTypes } from './apiUtils';
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

// Action Creators
export function getAlbumsPending(respose) {
  return {
    type: FETCH_ALBUMS_REQUEST,
  };
}

export function getAlbumsSuccess(response) {
  return {
    type: FETCH_ALBUMS_SUCCESS,
    payload: response,
  };
}

export function getAlbumPending() {
  return {
    type: REQUEST_ALBUM,
  };
}

export function getAlbumSuccess(response) {
  return {
    type: FETCH_ALBUM_SUCCESS,
    payload: response,
  };
}

function createAlbumPending() {
  return {
    type: CREATE_ALBUM,
  };
}

function createAlbumSuccess(response) {
  return {
    type: CREATE_ALBUM_SUCCESS,
    payload: response,
  };
}

export function updateAlbumPending() {
  return {
    type: UPDATE_ALBUM,
  };
}

export function updateAlbumSuccess(response) {
  return {
    type: UPDATE_ALBUM_SUCCESS,
    payload: response,
  };
}

export function addPhotoAlbumPending() {
  return {
    type: ADDPHOTO_ALBUM_REQUEST,
  };
}

export function addPhotoAlbumSuccess(response) {
  return {
    type: ADDPHOTO_ALBUM_SUCCESS,
    payload: response,
  };
}

export function deleteAlbumPending() {
  return {
    type: DELETE_ALBUM_REQUEST,
  };
}

export function deleteAlbumSuccess(response) {
  return {
    type: DELETE_ALBUM_SUCCESS,
    payload: response,
  };
}

//API
export function fetchAlbums() {
  const url = '/api/albums';
  const requestType = requestTypes.GET;
  const params = null;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(getAlbumsPending, getAlbumsSuccess, request, dispatch);
  };
}

export function fetchAlbum(id) {
  const url = '/api/albums/'.concat(id);
  const requestType = requestTypes.GET;
  const params = null;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(getAlbumPending, getAlbumSuccess, request, dispatch);
  };
}

export function createAlbum(payload) {
  const url = '/api/albums/';
  const requestType = requestTypes.POST;
  const params = payload;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(createAlbumPending, createAlbumSuccess, request, dispatch);
  };
}

export function updateAlbum(payload) {
  const url = '/api/albums/'.concat(payload.id);
  const requestType = requestTypes.PUT;
  const params = payload;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(updateAlbumPending, updateAlbumSuccess, request, dispatch);
  };
}

export function addPhotoAlbum(payload) {
  const url = '/api/albums/'.concat(payload.albumId, '/photo/', payload.photoId);
  const requestType = requestTypes.PUT;
  const params = null;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(addPhotoAlbumPending, addPhotoAlbumSuccess, request, dispatch);
  };
}

export function deleteAlbum(albumId) {
  const url = '/api/albums/'.concat(albumId);
  const requestType = requestTypes.DELETE;
  const params = null;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(deleteAlbumPending, deleteAlbumSuccess, request, dispatch);
  };
}
