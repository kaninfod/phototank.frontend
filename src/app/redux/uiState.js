import * as albumActions from './album';
import * as photoActions from './photo';
import { List, Map, fromJS } from 'immutable';

// Reducer
var init = Map(fromJS({
  hideAppbar: false,
  panelProps: {
    open: false,
    title: '',
    widget: 'PHOTO_INFO',
    size: 'small',
    widgetData: [],
  },
}));

var newState = null;

export function reducer(state=init, action={}) {

  switch (action.type) {

    case 'HIDE_APPBAR': {
      return state.set('hideAppbar', action.status);
    }

    case 'SHOW_PANEL': {
      return state.set('panelProps', fromJS(action.payload));
    }

    case 'HIDE_PANEL': {
      return state.setIn(['panelProps', 'open'], fromJS(action.status));
    }

  }
  return state;
}
