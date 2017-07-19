//To be deleted


import { createRequest, responseHandler, notAuthorized } from './apiUtils';
import stateTypes from '../constants/stateTypes';

export function createAlbum(params) {
  //API url
  const url = '/api/albums/';

  //make the call
  return dispatch => {

    dispatch(createAlbumPending());

    fetch(createRequest('POST', url, params))
    .then(response => responseHandler(response))
    .then(data => dispatch(createAlbumSuccess({ album: data })))
    .catch(error => console.log('request failed', error));
  };
}

// Action Creators
function createAlbumPending(response) {
  return {
    type: 'CREATE_ALBUM',
  };
}

function createAlbumSuccess(response) {
  return {
    type: stateTypes.CREATE_ALBUM_SUCCESS,
    payload: response,
  };
}
