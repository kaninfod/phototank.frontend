import { createRequest, responseHandler, notAuthorized } from './apiUtils';
import { List, Map, fromJS } from 'immutable';
import createHistory from 'history/createBrowserHistory';

//actions
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

    case LOGIN_SUCCESS: {
      sessionStorage.setItem('jwt', action.payload.token);
      history.push(action.redirectURL);
      state = state
        .set('token', action.payload.token)
        .set('user', action.payload.user)
        .set('loggedIn', true);
      return state;
    }

    case LOGOUT_SUCCESS: {
      sessionStorage.removeItem('jwt');
      history.push('/login');

      return state;
    }



  }
  return state;
}

// Action Creators
export function loginPending() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess(response) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token: response.data.auth_token,
      user: response.data.user,
    },
  };
}

export function logoutPending() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function logout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

//API
export function login(payload) {
  const url = '/api/authenticate';

  return dispatch => {
    dispatch(loginPending());

    fetch(createRequest('POST', url, payload))
    .then(response => responseHandler(response))
    .then(data => dispatch(loginSuccess({ data })))
    .catch(error => console.log('request failed', error));
  };
}
