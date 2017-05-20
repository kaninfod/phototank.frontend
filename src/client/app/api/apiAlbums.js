import { headers } from './apiUtils';

export function albums() {
  var url = '/api/albums.json';
  return function (dispatch) {
    var request = new Request(url, { headers: headers });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'LOAD_ALBUMS', payload: response.json() });
      })
      .catch((err) => {
        console.log('lakd');
        dispatch({ type: 'LOAD_ALBUMS', payload: err });
      });
  };
}

export function albumAddPhoto(payload) {
  var url = '/api/albums/'.concat(payload.albumId, '/photo/', payload.photoId, '/add');
  return function (dispatch) {
    var request = new Request(url, { headers: headers, method: 'GET' });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'ADD_TO_ALBUM', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_TO_ALBUM', payload: 'err' });
      });
  };
}
