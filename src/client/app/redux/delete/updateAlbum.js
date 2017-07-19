//Delete


import { createRequest, responseHandler, notAuthorized } from './apiUtils';
import stateTypes from '../constants/stateTypes';

export function updateAlbum(params) {
  //API url

  var url = '/api/albums/'.concat(params.id);

  //make the call
  return dispatch => {

    dispatch(updateAlbumPending());

    fetch(createRequest('PUT', url, params))
    .then(response => responseHandler(response))
    .then(data => dispatch(updateAlbumSuccess({ album: data })))
    .catch(error => console.log('request failed', error));
  };
}

// Action Creators
export function updateAlbumPending(response) {
  return {
    type: 'UPDATE_ALBUM',
  };
}

export function updateAlbumSuccess(response) {
  return {
    type: stateTypes.UPDATE_ALBUM_SUCCESS,
    payload: response,
  };
}
