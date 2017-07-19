import { createRequest, responseHandler, notAuthorized } from './apiUtils';
import { List, Map, fromJS } from 'immutable';

//actions
const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
const REQUEST_COUNTRIES = 'REQUEST_COUNTRIES';

// Reducer
var init = Map(fromJS({
  countries: [],
  loading: false,
}));

var newState = null;

export function countriesReducer(state=init, action={}) {
  switch (action.type) {
    case FETCH_COUNTRIES_SUCCESS: {

      action.payload.countries.unshift({ id: -1, name: 'All' });
      newState = state
        .set('countries', fromJS(action.payload.countries))
        .set('loading', false);
      return newState;
    }

    case REQUEST_COUNTRIES: {
      return state.set('loading', true);
    }
  }
  return state;
}

// Action Creators
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
export function fetchCountries() {
  var url = '/api/locations/countries.json?';

  return dispatch => {

    dispatch(requestCountries());

    return fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response))
    .then(data => dispatch(fetchCountriesSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}
