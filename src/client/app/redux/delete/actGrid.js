import stateTypes from '../constants/stateTypes';
import { photos, photoDelete } from '../api/apiPhotos';
import { catalogsPhotos } from '../api/apiCatalogs';
import { albumsPhotos } from '../api/apiAlbums';
import { bucketToggle } from '../api/apiBucket';
import { locationCountries } from '../api/apiLocations';
import store from '../store';

// export function getPhotos(payload) {
//   var photosArray = [];
//
//   return function (dispatch) {
//
//     dispatch({ type: stateTypes.LOAD_PHOTOS_PENDING });
//
//     if (payload.hasOwnProperty('context')) {
//       if (payload.context == 'catalog') {
//         photosArray = catalogsPhotos(payload.contextId, payload.page);
//       } else if (payload.context == 'album') {
//         photosArray = albumsPhotos(payload.contextId, payload.page);
//       } else if (payload.context == 'location') {
//         return null;
//       } else {
//         photosArray = photos(payload.searchParams, payload.page);
//       }
//     }
//
//     return photosArray
//     .then(response => {
//       dispatch({ type: stateTypes.LOAD_PHOTOS, payload: response.json });
//       dispatch({ type: stateTypes.SET_HEADER, payload: response.pagination });
//     });
//   };
// }

// export function clickPhoto(photoId) {
//   return {
//     type: stateTypes.CLICK_PHOTO,
//     payload: {
//       selectedPhoto: photoId,
//     },
//   };
// }

export function selectPhoto(photoId) {
  return bucketToggle(photoId);
}

// export function deletePhoto(photoId) {
//   return photoDelete(photoId);
// }

// export function getCountries() {
//   return function (dispatch) {
//     return locationCountries()
//     .then(response => {
//       dispatch({ type: stateTypes.LOAD_COUNTRIES_FULFILLED, payload: response });
//     })
//     .catch(error => {
//       throw(error);
//     });
//   };
// }
