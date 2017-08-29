import { requestTypes, notAuthorized } from './apiUtils';
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

    case 'FETCH_CATALOG_SUCCESS': {
      state = state.set('catalog', fromJS(action.payload));
      return state;
    }

    case 'CREATE_CATALOG_SUCCESS': {
      state = state.set('catalog', fromJS(action.payload));
      return state;
    }

    case 'DELETE_CATALOG_SUCCESS': {
      const catalogs = state.get('catalogs').filter(obj =>
         obj.get('id') != action.payload.id
      );
      return state.set('catalogs', catalogs);
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

//API
export function fetchCatalogs() {
  const apiPayload = {
    isAPI: true,
    type: 'FETCH_CATALOGS',
    url: '/api/catalogs',
    httpVerb: requestTypes.GET,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function fetchCatalog(catalogId) {
  const apiPayload = {
    isAPI: true,
    type: 'FETCH_CATALOG',
    url: '/api/catalogs/'.concat(catalogId, '.json'),
    httpVerb: requestTypes.GET,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function createCatalog(payload) {
  const apiPayload = {
    isAPI: true,
    type: 'CREATE_CATALOG',
    url: '/api/catalogs',
    httpVerb: requestTypes.POST,
    params: payload,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function verifyCatalog(payload) {
  const urlString = ''.concat('?id=', payload.id, '&oauth_verifier=', payload.verifier);
  const apiPayload = {
    isAPI: true,
    type: 'VERIFY_CATALOG',
    url: '/api/catalogs/oauth_verify'.concat(params),
    httpVerb: requestTypes.GET,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function importCatalog(catalogId) {
  const apiPayload = {
    isAPI: true,
    type: 'IMPORT_CATALOG',
    url: '/api/catalogs/'.concat(catalogId, '/import'),
    httpVerb: requestTypes.GET,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function updateCatalog(payload) {
  const apiPayload = {
    isAPI: true,
    type: 'UPDATE_CATALOG',
    url: '/api/catalogs/'.concat(payload.id),
    httpVerb: requestTypes.PUT,
    params: payload,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function deleteCatalog(catalogId) {
  const apiPayload = {
    isAPI: true,
    type: 'DELETE_CATALOG',
    url: '/api/catalogs/'.concat(catalogId),
    httpVerb: requestTypes.DELETE,
    params: null,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}
