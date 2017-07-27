import { createRequest, responseHandler, notAuthorized } from './apiUtils';
import stateTypes from '../constants/stateTypes';
import { List, Map, fromJS } from 'immutable';

//Actions
const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';

// Reducer
var init = Map(fromJS({
  albums: [],
  loading: false,
}));

var newState = null;

export function albumsReducer(state=init, action={}) {
  switch (action.type) {
    case FETCH_ALBUMS_SUCCESS: {
      newState = state
        .set('albums', fromJS(action.payload.albums))
        .set('loading', false);
      return newState;
    }

    case FETCH_ALBUMS_REQUEST: {
      return state.set('loading', true);
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

export function fetchAlbums() {
  //API url
  const url = '/api/albums.json';

  //make the call
  return dispatch => {

    dispatch(getAlbumsPending());

    fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response))
    .then(data => dispatch(getAlbumsSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}
