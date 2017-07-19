import { createRequest, responseHandler, notAuthorized } from './apiUtils';
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
  album: [],
}));

var newState = null;

export function reducer(state=init, action={}) {
  switch (action.type) {

    case FETCH_ALBUMS_SUCCESS: {
      newState = state.set('albums', fromJS(action.payload.albums));
      return newState;
    }

    case FETCH_ALBUM_SUCCESS: {
      newState = state.set('album', fromJS(action.payload.album));
      return newState;
    }

    case CREATE_ALBUM_SUCCESS: {
      newState = state.set('album', fromJS(action.payload.album));
      return newState;
    }

    case UPDATE_ALBUM_SUCCESS: {
      newState = state.set('album', fromJS(action.payload.album));
      return newState;
    }

    case DELETE_ALBUM_SUCCESS: {
      // newState = state.set('album', fromJS(action.payload.album));
      return newState;
    }
  }
  return state;
}

// Action Creators
export function getAlbumsPending(response) {
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

export function getAlbumPending(response) {
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

function createAlbumPending(response) {
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

export function updateAlbumPending(response) {
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

export function addPhotoAlbumPending(response) {
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

export function deleteAlbumPending(response) {
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
  const url = '/api/albums.json';
  return dispatch => {

    dispatch(getAlbumsPending());

    fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response, dispatch))
    .then(data => dispatch(getAlbumsSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}

export function fetchAlbum(id) {
  var url = '/api/albums/'.concat(id);

  return dispatch => {
    dispatch(getAlbumPending());

    fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response))
    .then(data => dispatch(getAlbumSuccess({ album: data })))
    .catch(error => console.log('request failed', error));
  };
}

export function createAlbum(params) {
  const url = '/api/albums/';

  return dispatch => {
    dispatch(createAlbumPending());

    fetch(createRequest('POST', url, params))
    .then(response => responseHandler(response))
    .then(data => dispatch(createAlbumSuccess({ album: data })))
    .catch(error => console.log('request failed', error));
  };
}

export function updateAlbum(params) {
  var url = '/api/albums/'.concat(params.id);

  return dispatch => {
    dispatch(updateAlbumPending());

    fetch(createRequest('PUT', url, params))
    .then(response => responseHandler(response))
    .then(data => dispatch(updateAlbumSuccess({ album: data })))
    .catch(error => console.log('request failed', error));
  };
}

export function addPhotoAlbum(payload) {
  var url = '/api/albums/'.concat(payload.albumId, '/photo/', payload.photoId);

  return dispatch => {
    dispatch(addPhotoAlbumPending());

    fetch(createRequest('PUT', url, null))
    .then(response => responseHandler(response))
    .then(data => dispatch(addPhotoAlbumSuccess({ album: data })))
    .catch(error => console.log('request failed', error));
  };
}

export function deleteAlbum(params) {
  var url = '/api/albums/'.concat(params.id);

  return dispatch => {
    dispatch(deleteAlbumPending());

    fetch(createRequest('DELETE', url, params))
    .then(response => responseHandler(response))
    .then(data => dispatch(deleteAlbumSuccess({ album: data })))
    .catch(error => console.log('request failed', error));
  };
}
