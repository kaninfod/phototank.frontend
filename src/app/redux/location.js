import { requestTypes } from './apiUtils';
import { List, Map, fromJS } from 'immutable';

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

    case 'FETCH_COUNTRIES_SUCCESS': {
      if (!action.payload) { return state; }

      action.payload.countries.unshift({ id: -1, name: 'All' });
      state = state.set('countries', fromJS(action.payload.countries));
      state = state.setIn(['loadedAt', 'countries'], Date());
      return state;
    }

    case 'FETCH_CITIES_SUCCESS': {
      if (!action.payload) { return state; }

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
  return {
    isAPI: true,
    type: 'FETCH_CITIES',
    url: '/api/locations/cities',
    httpVerb: requestTypes.GET,
    params: null,
    loadedAtIdentifier: ['nLocation', 'loadedAt', 'cities'],
  };
}

export function fetchCountries() {
  return {
    isAPI: true,
    type: 'FETCH_COUNTRIES',
    url: '/api/locations/countries',
    httpVerb: requestTypes.GET,
    params: null,
    loadedAtIdentifier: ['nLocation', 'loadedAt', 'countries'],
  };
}
