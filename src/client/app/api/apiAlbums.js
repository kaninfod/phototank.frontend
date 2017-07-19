import { headers } from './apiUtils';
// import {
//   getAlbumsSuccess, getAlbumsNotAuthorized, getAlbumsPending
// } from '../redux/actAlbum';

// export function albums() {
//   //API url
//   var url = '/api/albums.json';
//
//   //set up the request
//   var request = new Request(url,  {
//     headers: headers,
//     method: 'GET',
//   });
//
//   //make the call
//   return dispatch =>
//
//     // dispatch(getAlbumsPending());
//     fetch(request)
//     .then((response) => {
//       if (response.status >= 200 && response.status < 300) {
//         return response.json();
//       } else if (response.status == 401) {
//         const error = new Error(response.statusText);
//         error.response = response;
//         dispatch(getAlbumsNotAuthorized());
//         throw error;
//       }
//     })
//     .then(data => {
//       dispatch(getAlbumsSuccess(data));
//     })
//     .catch(error => {
//       console.log('request failed', error);
//     });
// }

// export function albumsPhotos(id, page) {
//   //API url
//   var url = '/api/albums/'.concat(id, '/photos.json?page=', page);
//
//   var request = new Request(url,  {
//     headers: headers,
//     method: 'GET',
//   });
//   return fetch(request)
//     .then(response => {
//       var payload = { json: response.json(), pagination: response.headers };
//       return payload;
//     })
//     .catch(err => err);
// }

// export function albumAddPhoto(payload) {
//   var url = '/api/albums/'.concat(payload.albumId, '/photo/', payload.photoId, '/add');
//   return function (dispatch) {
//     var request = new Request(url, { headers: headers, method: 'GET' });
//     fetch(request)
//       .then((response) => {
//         dispatch({ type: 'ADD_TO_ALBUM', payload: response.json() });
//       })
//       .catch((err) => {
//         dispatch({ type: 'ADD_TO_ALBUM', payload: 'err' });
//       });
//   };
// }
