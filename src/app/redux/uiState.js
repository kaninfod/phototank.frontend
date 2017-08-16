import * as albumActions from './album';
import * as photoActions from './photo';
import { List, Map, fromJS } from 'immutable';

// Reducer
var init = Map(fromJS({
  hideAppbar: false,
}));

var newState = null;

export function reducer(state=init, action={}) {
  state = state.setIn(['stale', action.type], new Date());
  switch (action.type) {

    case 'HIDE_APPBAR': {
      return state.set('hideAppbar', action.status);
    }

    // case photoActions.CLICK_PHOTO: {
    //   // return state.set('hidden', false);
    // }

  }
  return state;
}
