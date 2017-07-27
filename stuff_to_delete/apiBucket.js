import { headers } from './apiUtils';

export function bucket() {
  var url = '/api/bucket/widget.json';
  return function (dispatch) {
    var request = new Request(url, { headers: headers });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'LOAD_BUCKET', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'LOAD_BUCKET', payload: err });
      });
  };
}

export function bucketToggle(photoId) {
  var url = '/api/bucket/'.concat(photoId, '/toggle');
  return function (dispatch) {
    var request = new Request(url, { headers: headers, method: 'POST' });
    fetch(request)
      .then((response) => {
        dispatch({ type: 'SELECT_PHOTO', payload: response.json() });
      })
      .catch((err) => {
        dispatch({ type: 'SELECT_PHOTO', payload: 'err' });
      });
  };
}

export function bucketRotate(degrees) {
  var url = '/api/bucket/rotate';
  headers.append('Content-Type', 'application/json');
  var request = new Request(url, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ degrees: degrees }),
  });
  return fetch(request)
    .then(response => {
      return response.json();
    }).catch(err => {
      return err;
    });
}

export function bucketLike() {
  var url = '/api/bucket/like';
  headers.append('Content-Type', 'application/json');
  var request = new Request(url, {
    headers: headers,
    method: 'POST',
  });
  return fetch(request)
    .then(response => {
      return response.json();
    }).catch(err => {
      return err;
    });
}

export function bucketAddToAlbum(albumId) {
  var url = '/api/bucket/add_to_album';
  headers.append('Content-Type', 'application/json');
  var request = new Request(url, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({album_id: albumId}),
  });
  return fetch(request)
    .then(response => {
      return response.json();
    }).catch(err => {
      return err;
    });
}

export function bucketAddComment(comment) {
  var url = '/api/bucket/add_comment';
  headers.append('Content-Type', 'application/json');
  var request = new Request(url, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({comment: comment}),
  });
  return fetch(request)
    .then(response => {
      return response.json();
    }).catch(err => {
      return err;
    });
}
