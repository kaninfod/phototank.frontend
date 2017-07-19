import { createRequest, responseHandler, notAuthorized } from './apiUtils';
import { List, Map, fromJS } from 'immutable';

//actions
const FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS';
const REQUEST_CITIES = 'REQUEST_CITIES';

// Reducer
var init = Map(fromJS({
  cities: [],
  loading: false,
}));

var newState = null;

export function citiesReducer(state=init, action={}) {
  switch (action.type) {
    case FETCH_CITIES_SUCCESS: {
      action.payload.cities.unshift({ id: -1, name: 'All' });
      newState = state
        .set('cities', fromJS(action.payload.cities))
        .set('loading', false);
      return newState;
    }

    case REQUEST_CITIES: {
      return state.set('loading', true);
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

//API
export function fetchCities() {
  var url = '/api/locations/cities.json?';

  return dispatch => {

    dispatch(requestCities());

    return fetch(createRequest('GET', url, null))
    .then(response => responseHandler(response))
    .then(data => dispatch(fetchCitiesSuccess(data)))
    .catch(error => console.log('request failed', error));
  };
}
