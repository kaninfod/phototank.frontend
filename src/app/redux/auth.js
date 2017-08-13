import { requestTypes } from './apiUtils';
import { List, Map, fromJS } from 'immutable';
// import { withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

//actions
export const VALIDATE_TOKEN_SUCCESS = 'VALIDATE_TOKEN_SUCCESS';
export const VALIDATE_TOKEN_REQUEST = 'VALIDATE_TOKEN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

// Reducer
var init = Map(fromJS({
  token: null,
  user: [],
  loggedIn: false,
}));

const history = createHistory({ forceRefresh: true });
var newState = null;

export function reducer(state=init, action={}) {
  switch (action.type) {

    case VALIDATE_TOKEN_SUCCESS:

    case LOGIN_SUCCESS: {
      sessionStorage.setItem('jwt', action.payload.token);
      state = state
        .set('user', fromJS(action.payload))
        .set('loggedIn', true);
      return state;
    }

    case LOGOUT_SUCCESS: {
      sessionStorage.removeItem('jwt');
      return state.set('loggedIn', false).set('user', null);
    }
  }
  return state;
}

// Action Creators
export function logoutPending() {
  return { type: LOGOUT_REQUEST };
}

export function logout() {
  return { type: LOGOUT_SUCCESS };
}

//API
export function login(payload) {
  const apiPayload = {
    isAPI: true,
    type: 'LOGIN',
    url: '/api/users/login',
    httpVerb: requestTypes.POST,
    params: payload,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}

export function validateToken(payload) {
  const apiPayload = {
    isAPI: true,
    type: 'VALIDATE_TOKEN',
    url: '/api/users/from_token',
    httpVerb: requestTypes.GET,
    params: payload,
  };

  return dispatch => {
    dispatch(apiPayload);
  };
}
