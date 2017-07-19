import stateTypes from '../constants/stateTypes';
import { List, Map, fromJS } from 'immutable';

var init = {
  album: [],
  albums: [],
  loading: false,
};

const initialState = Map(fromJS(init));

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case stateTypes.FETCH_ALBUM_SUCCESS: {
      return state.set('album', fromJS(action.payload.album));
    }

    case stateTypes.FETCH_ALBUMS_SUCCESS: {
      console.log('action', action);
      return state.set('albums', fromJS(action.payload.albums));
    }
  }
  return state;
}
