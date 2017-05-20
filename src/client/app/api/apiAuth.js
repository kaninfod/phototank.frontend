import { headers } from './apiUtils';

// function toQueryString(paramsObject) {
//   if (!paramsObject) return '';
//   return Object
//     .keys(paramsObject)
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
//     .join('&')
//   ;
// }
//
// export function authValidateToken() {
//   var url = 'api/authentication/validate';
//   return function (dispatch) {
//     var request = new Request(url, { headers: headers, method: 'GET' });
//     fetch(request)
//       .then((response) => {
//         dispatch({ type: 'VALIDATE_TOKEN', payload: response.json() });
//       })
//       .catch((err) => {
//         dispatch({ type: 'VALIDATE_TOKEN', payload: err });
//       });
//   };
// }

export function authenticate(payload) {
  var url = '/api/authenticate';
  headers.append('Content-Type', 'application/json');
  var request = new Request(url, {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return fetch(request)
    .then(response => {
      return response.json();
    }).catch(err => {
      return err;
    });
}
