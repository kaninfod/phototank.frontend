import stateTypes from '../constants/stateTypes';
import { List, Map, fromJS } from 'immutable';

import createHistory from 'history/createBrowserHistory';

const history = createHistory({ forceRefresh: true });

var init = {
  authorized: false,
  session: !!sessionStorage.jwt,
};

const initialState = Map(fromJS(init));

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case stateTypes.LOG_IN_SUCCESS: {
      console.log(action);
      history.push(action.redirectURL);
      return !!sessionStorage.jwt;
    }

    case stateTypes.LOG_OUT: {
      history.push('/login');
      return !!sessionStorage.jwt;
    }
  }
  return state;
}
