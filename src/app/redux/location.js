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


//API
export function fetchCities() {
  const apiPayload = {
    isAPI: true,
    type: 'FETCH_CITIES',
    url: '/api/locations/cities',
    httpVerb: requestTypes.GET,
    params: null,
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
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}
