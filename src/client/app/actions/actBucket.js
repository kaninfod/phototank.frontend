import AppConstants from '../constants/constants';
import { bucketAddComment, bucketRotate, bucketLike, bucket, bucketToggle, bucketAddToAlbum } from '../api/apiBucket';
import { albums } from '../api/apiAlbums';

export function likePhotosInBucket(albumId) {
  return function(dispatch) {
    return bucketLike()
    .then(response => {
      dispatch({ type: 'LIKE_PHOTOS_IN_BUCKET', payload: response });
    })
    .catch(error => {
      throw(error);
    });
  };
}

export function rotatePhotosInBucket(degrees) {
  return function(dispatch) {
    return bucketRotate(degrees)
    .then(response => {
      dispatch({ type: 'ROTATE_PHOTOS_IN_BUCKET', payload: response });
    })
    .catch(error => {
      throw(error);
    });
  };
}

export function addCommentToPhotosInBucket(comment) {
  return function(dispatch) {
    return bucketAddComment(comment)
    .then(response => {
      dispatch({ type: 'ROTATE_PHOTOS_IN_BUCKET', payload: response });
    })
    .catch(error => {
      throw(error);
    });
  };
}

export function addBucketToAlbum(albumId) {
  return function(dispatch) {
    return bucketAddToAlbum(albumId)
    .then(response => {
      dispatch({ type: 'ADD_BUCKET_TO_ALBUM', payload: response });
    })
    .catch(error => {
      throw(error);
    });
  };
}

export function loadBucket() {
  return bucket();
}

export function selectPhoto(photoId) {
  return bucketToggle(photoId);
}

export function loadAlbums() {
  return albums();
}

export function setWidget(widget) {
  return {
    type: 'SET_BUCKET_WIDGET',
    payload: { widget: widget },
  };
}
