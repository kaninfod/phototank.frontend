import { requestTypes } from './apiUtils';
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
  loadedAt: {
    cities: false,
    countries: false,
  },
}));

// var newState = null;

export function reducer(state=init, action={}) {
  switch (action.type) {

    case FETCH_COUNTRIES_SUCCESS: {
      if (!action.payload) { return state; };

      action.payload.countries.unshift({ id: -1, name: 'All' });
      state = state.set('countries', fromJS(action.payload.countries));
      state = state.setIn(['loadedAt', 'countries'], Date());
      return state;
    }

    case FETCH_CITIES_SUCCESS: {
      if (!action.payload) { return state; };

      action.payload.cities.unshift({ id: -1, name: 'All' });
      state = state.set('cities', fromJS(action.payload));
      state = state.setIn(['loadedAt', 'cities'], Date());
      return state;
    }

  }
  return state;
}

//API
export function fetchCities() {
  const apiPayload = {
    isAPI: true,
    type: 'FETCH_CITIES',
    url: '/api/locations/cities',
    httpVerb: requestTypes.GET,
    params: null,
    loadedAtIdentifier: ['nLocation', 'loadedAt', 'cities'],
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function fetchCountries() {
  const apiPayload = {
    isAPI: true,
    type: 'FETCH_COUNTRIES',
    url: '/api/locations/countries',
    httpVerb: requestTypes.GET,
    params: null,
    loadedAtIdentifier: ['nLocation', 'loadedAt', 'countries'],
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}
