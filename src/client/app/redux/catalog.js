import { createRequest, responseHandler, notAuthorized } from './apiUtils';
import { List, Map, fromJS } from 'immutable';

//actions
export const FETCH_CATALOGS_SUCCESS = 'FETCH_CATALOGS_SUCCESS';
export const FETCH_CATALOGS_REQUEST = 'FETCH_CATALOGS_REQUEST';
export const FETCH_CATALOG_SUCCESS = 'FETCH_CATALOGS_SUCCESS';
export const FETCH_CATALOG_REQUEST = 'FETCH_CATALOGS_REQUEST';
export const CREATE_CATALOG_SUCCESS = 'CREATE_CATALOG_SUCCESS';
export const CREATE_CATALOG_REQUEST = 'CREATE_CATALOG_REQUEST';
export const VERIFY_CATALOG_SUCCESS = 'VERIFY_CATALOG_SUCCESS';
export const VERIFY_CATALOG_REQUEST = 'VERIFY_CATALOG_REQUEST';
export const IMPORT_CATALOG_SUCCESS = 'IMPORT_CATALOG_SUCCESS';
export const IMPORT_CATALOG_REQUEST = 'IMPORT_CATALOG_REQUEST';
export const UPDATE_CATALOG_SUCCESS = 'UPDATE_CATALOG_SUCCESS';
export const UPDATE_CATALOG_REQUEST = 'UPDATE_CATALOG_REQUEST';

// Reducer
var init = Map(fromJS({
  catalogs: [],
  catalog: [],
}));

var newState = null;

export function reducer(state=init, action={}) {
  switch (action.type) {

    case FETCH_CATALOGS_SUCCESS: {
      state = state.set('catalogs', fromJS(action.payload.catalogs));
      return state;
    }

    case FETCH_CATALOG_SUCCESS: {
      state = state.set('catalog', fromJS(action.payload.catalogs));
      return state;
    }

    case CREATE_CATALOG_SUCCESS: {
      state = state.set('catalog', fromJS(action.payload.catalog));
      return state;
    }

    case VERIFY_CATALOG_SUCCESS: {
      return state;
    }

    case IMPORT_CATALOG_SUCCESS: {
      return state;
    }

    case UPDATE_CATALOG_SUCCESS: {
      return state;
    }
  }
  return state;
}

// Action Creators
export function getCatalogsPending(response) {
  return { type: FETCH_CATALOGS_REQUEST, };
}

export function getCatalogsSuccess(response) {
  return { type: FETCH_CATALOGS_SUCCESS, payload: response, };
}

export function getCatalogPending(response) {
  return { type: FETCH_CATALOG_REQUEST, };
}

export function getCatalogSuccess(response) {
  return { type: FETCH_CATALOG_SUCCESS, payload: response, };
}

export function createCatalogSuccess(response) {
  return { type: CREATE_CATALOG_SUCCESS, payload: response, };
}

export function createCatalogPending(response) {
  return { type: CREATE_CATALOG_REQUEST, };
}

export function verifyCatalogSuccess(response) {
  return { type: VERIFY_CATALOG_SUCCESS, payload: response, };
}

export function verifyCatalogPending(response) {
  return { type: VERIFY_CATALOG_REQUEST, };
}

export function importCatalogSuccess(response) {
  return { type: IMPORT_CATALOG_SUCCESS, payload: response, };
}

export function importCatalogPending(response) {
  return { type: IMPORT_CATALOG_REQUEST, };
}

export function updateCatalogSuccess(response) {
  return { type: UPDATE_CATALOG_SUCCESS, payload: response, };
}

export function updateCatalogPending(response) {
  return { type: UPDATE_CATALOG_REQUEST, };
}

//API
export function fetchCatalogs() {
  const url = '/api/catalogs.json';
  return dispatch => {

    dispatch(getCatalogsPending());

    fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response, dispatch))
    .then(data => dispatch(getCatalogsSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}

export function fetchCatalog(payload) {
  var url = '/api/catalogs/'.concat(payload.id, '.json');
  return dispatch => {

    dispatch(getCatalogPending());

    fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response, dispatch))
    .then(data => dispatch(getCatalogSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}

export function createCatalog(params) {
  const url = '/api/catalogs/create.json';
  return dispatch => {

    dispatch(createCatalogPending());

    fetch(createRequest('POST', url, params))
    .then(response => responseHandler(response, dispatch))
    .then(data => dispatch(createCatalogSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}

export function verifyCatalog(payload) {
  const params = ''.concat('?id=', payload.id, '&oauth_verifier=', payload.verifier);
  const url = '/api/catalogs/oauth_verify'.concat(params);
  return dispatch => {

    dispatch(verifyCatalogPending());

    fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response, dispatch))
    .then(data => dispatch(verifyCatalogSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}

export function importCatalog(payload) {
  const url = '/api/catalogs/'.concat(catalogId, '/import');
  return dispatch => {

    dispatch(importCatalogPending());

    fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response, dispatch))
    .then(data => dispatch(importCatalogSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}

export function updateCatalog(payload) {
  const url = '/api/catalogs/'.concat(payload.id);
  return dispatch => {

    dispatch(updateCatalogPending());

    fetch(createRequest('PUT', url, payload))
    .then(response => responseHandler(response, dispatch))
    .then(data => dispatch(updateCatalogSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}
