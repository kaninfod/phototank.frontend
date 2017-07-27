import stateTypes from '../constants/stateTypes';
import { albumAddPhoto } from '../api/apiAlbums';
import { photo, photoRotate, photoAddComment, photoLike } from '../api/apiPhotos';

// export function loadPhoto(photoId) {
//   return function (dispatch) {
//     dispatch({ type: stateTypes.LOAD_PHOTO_PENDING, payload: {} });
//
//     return photo(photoId)
//     .then(response => {
//       dispatch({ type: stateTypes.LOAD_PHOTO_FULFILLED, payload: response });
//     })
//     .catch(error => {
//       throw(error);
//     });
//   };
// }

// export function setWidget(widget) {
//   return {
//     type: stateTypes.SET_WIDGET,
//     payload: { widget: widget },
//   };
// }

export function addToAlbum(payload) {
  albumAddPhoto(payload);
}

// export function rotatePhoto(payload) {
//   return photoRotate(payload);
// }

// export function addComment(payload) {
//   return photoAddComment(payload);
// }

// export function likePhoto(photoId) {
//   return photoLike(photoId);
// }

export function deleteCardPhoto(widget) {
  return {
    type: stateTypes.SET_WIDGET,
    payload: { widget: widget },
  };
}
