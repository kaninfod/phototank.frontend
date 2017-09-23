import { List, Map, fromJS } from 'immutable';

// Reducer
var init = Map(fromJS({
  hideAppbar: false,
  selectedPhoto: null,
  showSearchPanel: false,
  snackBar: {
    show: false,
    message: '',
  },
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

    case 'SHOW_MESSAGE': {
      return state.set('snackBar', fromJS({ show: true, message: action.message, timeout: action.timeout || 3500 }));
    }

    case 'HIDE_MESSAGE': {
      return state.set('snackBar', fromJS({ show: false, message: '' }));
    }
  }
  return state;
}
