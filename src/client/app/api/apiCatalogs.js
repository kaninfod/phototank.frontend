import { headers, toQueryString } from './apiUtils';

export function catalogs() {
  var url = '/api/catalogs.json';

  var request = new Request(url,  {
    headers: headers,
    method: 'GET',
  });
  return fetch(request)
    .then(response => response.json())
    .catch(err => err);
}

export function catalogsCreate(payload) {
  var url = '/api/catalogs/create_c';
  headers.append('Content-Type', 'application/json');
  var request = new Request(url,  {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({
      name: payload.name,
      type: payload.type,
      sync_from_catalog: payload.sync_from_catalog_id,
    }),
  });
  return fetch(request)
    .then(response => response.json())
    .catch(err => err);
}

export function catalogsVerifyDropbox(payload) {
  const params = ''.concat('?id=', payload.id, '&oauth_verifier=', payload.verifier);
  var url = '/api/catalogs/oauth_verify'.concat(params);
  headers.append('Content-Type', 'application/json');
  var request = new Request(url,  {
    headers: headers,
    method: 'GET',
  });
  return fetch(request)
    .then(response => response.json())
    .catch(err =>  err);
}

export function catalogsGet(payload) {
  var url = '/api/catalogs/'.concat(payload.id, '.json');
  headers.append('Content-Type', 'application/json');
  var request = new Request(url,  {
    headers: headers,
    method: 'GET',
  });
  return fetch(request)
    .then(response => response.json())
    .catch(err =>  err);
}

export function catalogsUpdate(payload) {
  var url = '/api/catalogs/'.concat(payload.id);
  headers.append('Content-Type', 'application/json');
  var request = new Request(url,  {
    headers: headers,
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return fetch(request)
    .then(response => response.json())
    .catch(err => err);
}

export function catalogsImport(catalogId) {
  var url = '/api/catalogs/'.concat(catalogId, '/import');

  var request = new Request(url,  {
    headers: headers,
    method: 'GET',
  });
  return fetch(request)
    .then(response => response.json())
    .catch(err => err);
}

export function catalogsPhotos(id, page) {
  var url = '/api/catalogs/'.concat(id, '/photos.json?page=', page);

  var request = new Request(url,  {
    headers: headers,
    method: 'GET',
  });
  return fetch(request)
    .then(response => {
      var payload = { json: response.json(), pagination: response.headers };
      return payload;
    })
    .catch(err => err);
}
