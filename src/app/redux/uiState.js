import { List, Map, fromJS } from 'immutable';

// Reducer
var init = Map(fromJS({
  hideAppbar: false,
  selectedPhoto: null,
  showSearchPanel: false,
}));

var newState = null;

export function reducer(state=init, action={}) {

  switch (action.type) {

    case 'HIDE_APPBAR': {
      return state.set('hideAppbar', action.status);
    }

    case 'TOGGLE_SEARCHPANEL': {
      return state.set('showSearchPanel', !state.get('showSearchPanel'));
    }

    case 'SELECT_PHOTO': {
      return state.set('selectedPhoto', fromJS(action.photoId));
    }

  }
  return state;
}
