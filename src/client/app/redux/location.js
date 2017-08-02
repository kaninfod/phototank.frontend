import { createRequest, responseHandler, notAuthorized } from './apiUtils';
import { List, Map, fromJS } from 'immutable';

//actions
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const REQUEST_COUNTRIES = 'REQUEST_COUNTRIES';
export const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS';
export const REQUEST_CITIES = 'REQUEST_CITIES';

// Reducer
var init = Map(fromJS({
  countries: [],
  cities: [],
}));

var newState = null;

export function reducer(state=init, action={}) {
  switch (action.type) {

    case FETCH_COUNTRIES_SUCCESS: {
      action.payload.unshift({ id: -1, name: 'All' });
      newState = state.set('countries', fromJS(action.payload));
      return newState;
    }

    case FETCH_CITIES_SUCCESS: {
      action.payload.unshift({ id: -1, name: 'All' });
      newState = state.set('cities', fromJS(action.payload));
      return newState;
    }

  }
  return state;
}

// Action Creators
function requestCities() {
  return {
    type: REQUEST_CITIES,
  };
}

function fetchCitiesSuccess(data) {
  return {
    type: FETCH_CITIES_SUCCESS,
    payload: data,
  };
}

function requestCountries() {
  return {
    type: REQUEST_COUNTRIES,
  };
}

function fetchCountriesSuccess(data) {
  return {
    type: FETCH_COUNTRIES_SUCCESS,
    payload: data,
  };
}

//API
export function fetchCities() {
  var url = '/api/locations/cities';

  return dispatch => {

    dispatch(requestCities());

    return fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response))
    .then(data => dispatch(fetchCitiesSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}

export function fetchCountries() {
  var url = '/api/locations/countries';

  return dispatch => {

    dispatch(requestCountries());

    return fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response))
    .then(data => dispatch(fetchCountriesSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}
