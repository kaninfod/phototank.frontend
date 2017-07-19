import { headers, toQueryString } from './apiUtils';

// export function locationCountries() {
//   var url = '/api/locations/countries.json?';
//
//   var request = new Request(url,  {
//     headers: headers,
//     method: 'GET',
//   });
//   return fetch(request)
//     .then(response => {
//       return response.json();
//     }).catch(err => {
//       return err;
//     });
// }

// export function fetchCountries() {
//   var url = '/api/locations/countries.json?';
//
//   var request = new Request(url,  {
//     headers: headers,
//     method: 'GET',
//   });
//
//   return dispatch => {
//
//     dispatch(requestCountries());
//
//     return fetch(request)
//       .then(response => {
//         if (response.status >= 200 && response.status < 300) {
//           return response.json();
//         } else if (response.status == 401) {
//           const error = new Error(response.statusText);
//           error.response = response;
//           dispatch(notAuthorized());
//           throw error;
//         }
//       })
//       .then(data => {
//         dispatch({ type: 'LOAD_COUNTRIES_FULFILLED', payload: data });
//       })
//       .catch(err => {
//         return err;
//       });
//   };
//
// }
//
// function validateRespons(response) {
//   console.log('here...');
//   if (response.status >= 200 && response.status < 300) {
//     return response.json();
//   } else if (response.status == 401) {
//     console.log('here 401');
//     const error = new Error(response.statusText);
//     error.response = response;
//     { type: 'LOG_OUT' }
//     throw error;
//   }
// }
//
// export function notAuthorized() {
//   return dispatch => {
//     dispatch({ type: 'LOG_OUT' });
//   };
// }
//
// function requestCountries() {
//   return {
//     type: 'REQUEST_COUNTRIES',
//   };
// }
