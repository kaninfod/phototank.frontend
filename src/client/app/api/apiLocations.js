import { headers, toQueryString } from './apiUtils';

export function locationCountries() {
  var url = '/api/locations/countries.json?';

  var request = new Request(url,  {
    headers: headers,
    method: 'GET',
  });
  return fetch(request)
    .then(response => {
      return response.json();
    }).catch(err => {
      return err;
    });
}
