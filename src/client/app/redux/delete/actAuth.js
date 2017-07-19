// import AppConstants from '../constants/constants'
// import { authenticate, authValidateToken } from '../api/apiAuth';
//
// export function loginSuccess() {
//   return { type: 'LOG_IN_SUCCESS' };
// }
//
// export function login(payload) {
//   return function(dispatch) {
//     return authenticate(payload)
//     .then(response => {
//       sessionStorage.setItem('jwt', response.auth_token);
//       dispatch({
//         type: 'LOG_IN_SUCCESS',
//         redirectURL: payload.redirectURL,
//       });
//     }).catch(error => {
//       throw(error);
//     });
//   };
// }
//
// export function logout() {
//   sessionStorage.removeItem('jwt');
//   return {type: 'LOG_OUT'}
// }
//
// // export function isLoggedIn() {
// //   return authValidateToken();
// // }
