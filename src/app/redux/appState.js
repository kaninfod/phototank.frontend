import * as albumActions from './album';
import * as photoActions from './photo';
import * as catalogActions from './catalog';
import { List, Map, fromJS } from 'immutable';

export const SET_WIDGET = 'SET_WIDGET';

// Reducer
var init = Map(fromJS({
  loadingStates: {
    photoGrid: false,
    verifyCatalog: false,
    createCatelog: false,
    fetchCatalog: false,
    fetchCatelogs: false,
    albumsFetch: false,
  },
  initialLoad: true,
  selectedPhoto: [],
  // selectedWidget: 'INFO',
}));

var newState = null;

export function reducer(state=init, action={}) {
  switch (action.type) {

    // case SET_WIDGET: {
    //   return state.set('selectedWidget', action.payload.widget);
    // }

    // case photoActions.CLICK_PHOTO: {
    //   return state.set('selectedPhoto', action.payload);
    // }

    case 'TOGGLE_INITIAL_LOAD': {
      return state.set('initialLoad', false);
    }

    case catalogActions.VERIFY_CATALOG_REQUEST: {
      return state.setIn(['loadingStates', 'verifyCatalog'], true);
    }

    case catalogActions.VERIFY_CATALOG_SUCCESS: {
      return state.setIn(['loadingStates', 'verifyCatalog'], false);
    }

    case catalogActions.CREATE_CATALOG_REQUEST: {
      return state.setIn(['loadingStates', 'createCatelog'], true);
    }

    case catalogActions.CREATE_CATALOG_SUCCESS: {
      return state.setIn(['loadingStates', 'createCatelog'], false);
    }

    case catalogActions.FETCH_CATALOG_REQUEST: {
      return state.setIn(['loadingStates', 'fetchCatalog'], true);
    }

    case catalogActions.FETCH_CATALOG_SUCCESS: {
      return state.setIn(['loadingStates', 'fetchCatelog'], false);
    }

    case catalogActions.FETCH_CATALOGS_REQUEST: {
      return state.setIn(['loadingStates', 'fetchCatelogs'], true);
    }

    case catalogActions.FETCH_CATALOGS_SUCCESS: {
      return state.setIn(['loadingStates', 'fetchCatelogs'], false);
    }

    case albumActions.FETCH_ALBUMS_REQUEST: {
      return state.setIn(['loadingStates', 'albumsFetch'], true);
    }

    case albumActions.FETCH_ALBUMS_SUCCESS: {
      return state.setIn(['loadingStates', 'fetchAlbums'], false);
    }

    case photoActions.FETCH_PHOTOS_REQUEST: {
      return state.setIn(['loadingStates', 'photoGrid'], true);
    }

    case photoActions.FETCH_PHOTOS_SUCCESS: {
      return state.setIn(['loadingStates', 'photoGrid'], false);
    }

  }
  return state;
}

//Action Creators
export function setWidget(widget) {
  return {
    type: SET_WIDGET,
    payload: { widget: widget },
  };
}
