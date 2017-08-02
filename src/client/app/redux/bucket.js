// import { createRequest, responseHandler, notAuthorized } from './apiUtils';
// import { List, Map, fromJS } from 'immutable';
//
// //actions
// export const ADD_PHOTOS_ALBUM_REQUEST = 'ADD_PHOTOS_ALBUM_REQUEST';
// export const ADD_PHOTOS_ALBUM_SUCCESS = 'ADD_PHOTOS_ALBUM_SUCCESS';
// export const COMMENT_PHOTOS_BUCKET_REQUEST = 'COMMENT_PHOTOS_BUCKET_REQUEST';
// export const COMMENT_PHOTOS_BUCKET_SUCCESS = 'COMMENT_PHOTOS_BUCKET_SUCCESS';
// export const TAG_PHOTOS_BUCKET_REQUEST = 'TAG_PHOTOS_BUCKET_REQUEST';
// export const TAG_PHOTOS_BUCKET_SUCCESS = 'TAG_PHOTOS_BUCKET_SUCCESS';
// export const ROTATE_PHOTOS_BUCKET_REQUEST = 'ROTATE_PHOTOS_BUCKET_REQUEST';
// export const ROTATE_PHOTOS_BUCKET_SUCCESS = 'ROTATE_PHOTOS_BUCKET_SUCCESS';
// export const LIKE_PHOTOS_BUCKET_REQUEST = 'LIKE_PHOTOS_BUCKET_REQUEST';
// export const LIKE_PHOTOS_BUCKET_SUCCESS = 'LIKE_PHOTOS_BUCKET_SUCCESS';
// export const TOGGLE_PHOTOS_BUCKET_REQUEST = 'TOGGLE_PHOTOS_BUCKET_REQUEST';
// export const TOGGLE_PHOTOS_BUCKET_SUCCESS = 'TOGGLE_PHOTOS_BUCKET_SUCCESS';
// export const GET_PHOTOS_BUCKET_REQUEST = 'GET_PHOTOS_BUCKET_REQUEST';
// export const GET_PHOTOS_BUCKET_SUCCESS = 'GET_PHOTOS_BUCKET_SUCCESS';
//
// // Reducer
// var init = Map(fromJS({
//   bucket: {
//     bucket: [],
//   },
// }));
//
// var newState = null;
//
// export function reducer(state=init, action={}) {
//   switch (action.type) {
//
//     case GET_PHOTOS_BUCKET_SUCCESS: {
//       return state.set('bucket', fromJS(action.payload));
//     }
//
//     case ADD_PHOTOS_ALBUM_SUCCESS: {
//       return state;
//     }
//
//     case TOGGLE_PHOTOS_BUCKET_SUCCESS: {
//       return state.setIn(['bucket', 'bucket'], fromJS(action.payload.bucket));
//     }
//
//   }
//   return state;
// }
//
// // Action Creators
// export function addPhotoAlbumBucketPending() {
//   return { type: ADD_PHOTOS_ALBUM_REQUEST };
// }
//
// export function addPhotoAlbumBucketSuccess(response) {
//   return {
//     type: ADD_PHOTOS_ALBUM_SUCCESS,
//     payload: response,
//   };
// }
//
// export function commentPhotosBucketPending() {
//   return { type: COMMENT_PHOTOS_BUCKET_REQUEST };
// }
//
// export function commentPhotosBucketSuccess(response) {
//   return {
//     type: COMMENT_PHOTOS_BUCKET_SUCCESS,
//     payload: response,
//   };
// }
//
// export function tagPhotosBucketPending() {
//   return { type: TAG_PHOTOS_BUCKET_REQUEST };
// }
//
// export function tagPhotosBucketSuccess(response) {
//   return {
//     type: TAG_PHOTOS_BUCKET_SUCCESS,
//     payload: response,
//   };
// }
//
// export function rotatePhotosBucketPending() {
//   return { type: ROTATE_PHOTOS_BUCKET_REQUEST };
// }
//
// export function rotatePhotosBucketSuccess(response) {
//   return {
//     type: ROTATE_PHOTOS_BUCKET_SUCCESS,
//     payload: response,
//   };
// }
//
// export function likePhotosBucketPending() {
//   return { type: LIKE_PHOTOS_BUCKET_REQUEST };
// }
//
// export function likePhotosBucketSuccess(response) {
//   return {
//     type: LIKE_PHOTOS_BUCKET_SUCCESS,
//     payload: response,
//   };
// }
//
// export function togglePhotosBucketPending() {
//   return { type: TOGGLE_PHOTOS_BUCKET_REQUEST };
// }
//
// export function togglePhotosBucketSuccess(response) {
//   return {
//     type: TOGGLE_PHOTOS_BUCKET_SUCCESS,
//     payload: response,
//   };
// }
//
// export function getPhotosBucketPending() {
//   return { type: GET_PHOTOS_BUCKET_REQUEST };
// }
//
// export function getPhotosBucketSuccess(response) {
//   return {
//     type: GET_PHOTOS_BUCKET_SUCCESS,
//     payload: response,
//   };
// }
//
// //API
// export function getPhotosBucket() {
//   const url = '/api/bucket/widget.json';
//   return dispatch => {
//
//     dispatch(getPhotosBucketPending());
//
//     fetch(createRequest('GET', url, null))
//     .then(response => responseHandler(response, dispatch))
//     .then(data => dispatch(getPhotosBucketSuccess(data)))
//     .catch(error => console.log('request failed', error));
//   };
// }
//
// export function togglePhotosBucket(photoId) {
//   const url = '/api/bucket/'.concat(photoId, '/toggle');
//   return dispatch => {
//
//     dispatch(togglePhotosBucketPending());
//
//     fetch(createRequest('POST', url, null))
//     .then(response => responseHandler(response, dispatch))
//     .then(data => dispatch(togglePhotosBucketSuccess(data)))
//     .catch(error => console.log('request failed', error));
//   };
// }
//
// export function addPhotoAlbumBucket(albumId) {
//   const url = '/api/bucket/add_to_album/';
//   return dispatch => {
//
//     dispatch(addPhotoAlbumBucketPending());
//
//     fetch(createRequest('POST', url, { album_id: albumId }))
//     .then(response => responseHandler(response, dispatch))
//     .then(data => dispatch(addPhotoAlbumBucketSuccess(data)))
//     .catch(error => console.log('request failed', error));
//   };
// }
//
// export function commentPhotosBucket(comment) {
//   const url = '/api/bucket/add_comment';
//   return dispatch => {
//
//     dispatch(commentPhotosBucketPending());
//
//     fetch(createRequest('POST', url, { comment: comment }))
//     .then(response => responseHandler(response, dispatch))
//     .then(data => dispatch(commentPhotosBucketSuccess(data)))
//     .catch(error => console.log('request failed', error));
//   };
// }
//
// export function tagPhotosBucket(tag) {
//   const url = '/api/bucket/add_tag';
//   return dispatch => {
//
//     dispatch(tagPhotosBucketPending());
//
//     fetch(createRequest('POST', url, { tag: tag }))
//     .then(response => responseHandler(response, dispatch))
//     .then(data => dispatch(tagPhotosBucketSuccess(data)))
//     .catch(error => console.log('request failed', error));
//   };
// }
//
// export function rotatePhotosBucket(degrees) {
//   const url = '/api/bucket/rotate';
//   return dispatch => {
//
//     dispatch(rotatePhotosBucketPending());
//
//     fetch(createRequest('POST', url, { degrees: degrees }))
//     .then(response => responseHandler(response, dispatch))
//     .then(data => dispatch(rotatePhotosBucketSuccess(data)))
//     .catch(error => console.log('request failed', error));
//   };
// }
//
// export function likePhotosBucket() {
//   const url = '/api/bucket/like';
//   return dispatch => {
//
//     dispatch(likePhotosBucketPending());
//
//     fetch(createRequest('POST', url, null))
//     .then(response => responseHandler(response, dispatch))
//     .then(data => dispatch(likePhotosBucketSuccess(data)))
//     .catch(error => console.log('request failed', error));
//   };
// }
