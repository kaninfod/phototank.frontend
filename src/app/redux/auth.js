import { requestTypes } from './apiUtils';
import { List, Map, fromJS } from 'immutable';

// Reducer
var init = Map(fromJS({
  token: null,
  user: [],
  loggedIn: false,
}));

// const history = createHistory({ forceRefresh: true });
var newState = null;

export function reducer(state=init, action={}) {
  switch (action.type) {

    case 'VALIDATE_TOKEN_SUCCESS':

    case 'LOGIN_SUCCESS': {
      sessionStorage.setItem('jwt', action.payload.user.token);
      state = state
        .set('user', fromJS(action.payload.user))
        .set('loggedIn', true);
      return state;
    }

    case 'LOGOUT_SUCCESS': {
      console.log('do I go here');
      sessionStorage.removeItem('jwt');
      return state.set('loggedIn', false).set('user', null);
    }
  }
  return state;
}

// Action Creators
export function logoutPending() {
  return { type: 'LOGOUT_REQUEST' };
}

export function logout() {
  return { type: 'LOGOUT_SUCCESS' };
}

//API
export function login(payload) {
  return {
    isAPI: true,
    type: 'LOGIN',
    url: '/api/users/login',
    httpVerb: requestTypes.POST,
    params: payload,
  };
}

export function validateToken(payload) {
  return {
    isAPI: true,
    type: 'VALIDATE_TOKEN',
    url: '/api/users/from_token',
    httpVerb: requestTypes.GET,
    params: payload,
  };
}
