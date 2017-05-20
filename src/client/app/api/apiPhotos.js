import { headers, toQueryString } from './apiUtils';

export function photos(params, page) {
  var url = '/api/photos.json';
  params = toQueryString(params);
  url = url.concat('?', params, '&page=', page);
  var request = new Request(url,  {
    headers: headers,
    method: 'GET',
  });
  return fetch(request)
    .then(response => {
      var payload = { json: response.json(), pagination: response.headers };
      return payload;
    })
    .catch(err => err);
}

export function photo(photoId) {
  var url = '/api/photos/'.concat(photoId, '.json');
  var request = new Request(url, { headers: headers });
  return fetch(request)
    .then((response) => response.json())
    .catch((err) => err);
}

export function photoDelete(photoId) {
  var url = '/api/photos/' + photoId + '.json';
  return function (dispatch) {
    var request = new Request(url, { headers: headers, method: 'DELETE' });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'DELETE_PHOTO', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_PHOTO', payload: 'err' });
      });
  };
}

export function photoRotate(payload) {
  var url = '/api/photos/'.concat(payload.photoId, '/rotate/', payload.rotation);
  return function (dispatch) {
    var request = new Request(url, { headers: headers, method: 'GET' });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'ROTATE_PHOTO', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'ROTATE_PHOTO', payload: 'err' });
      });
  };
}

export function photoAddComment(payload) {
  var url = '/api/photos/'.concat(payload.photoId, '/add_comment');
  return function (dispatch) {
    headers.append('Content-Type', 'application/json');
    var request = new Request(
      url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ comment: payload.comment }),
      });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'ADD_COMMENT', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_COMMENT', payload: 'err' });
      });
  };
}

export function photoLike(photoId) {
  var url = '/api/photos/'.concat(photoId, '/like');
  return function (dispatch) {
    var request = new Request(url, { headers: headers, method: 'GET' });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'LIKE_PHOTO', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'LIKE_PHOTO', payload: 'err' });
      });
  };
}
