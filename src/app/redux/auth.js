import { apiHandler, createRequest, requestTypes } from './apiUtils';
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
      sessionStorage.setItem('jwt', action.payload.remember_token);
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
export function loginPending() {
  return { type: LOGIN_REQUEST };
}

export function loginSuccess(response) {
  return {
    type: LOGIN_SUCCESS, payload: response, };
}

export function validateTokenPending() {
  return { type: VALIDATE_TOKEN_REQUEST };
}

export function validateTokenSuccess(response) {
  return {
    type: VALIDATE_TOKEN_SUCCESS, payload: response, };
}

export function logoutPending() {
  return { type: LOGOUT_REQUEST };
}

export function logout() {
  return { type: LOGOUT_SUCCESS };
}

//API
export function login(payload) {
  const url = '/api/users/login';
  const requestType = requestTypes.POST;
  const params = payload;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(loginPending, loginSuccess, request, dispatch);
  };
}

export function validateToken(payload) {
  const url = '/api/users/from_token';
  const requestType = requestTypes.GET;
  const params = payload;
  const request = createRequest(requestType, url, params);
  return dispatch => {
    apiHandler(validateTokenPending, validateTokenSuccess, request, dispatch);
  };
}
