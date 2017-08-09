import * as albumActions from './album';
import * as photoActions from './photo';
import { List, Map, fromJS } from 'immutable';

// Reducer
var init = Map(fromJS({

}));

var newState = null;

export function reducer(state=init, action={}) {
  state = state.setIn(['stale', action.type], new Date());
  switch (action.type) {

    // case photoActions.CLICK_PHOTO: {
    //   // return state.set('hidden', false);
    // }

    // case photoActions.CLICK_PHOTO: {
    //   // return state.set('hidden', false);
    // }

  }
  return state;
}
