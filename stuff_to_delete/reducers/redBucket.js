import stateTypes from '../constants/stateTypes';
import { List, Map, fromJS } from 'immutable';

var init = {
  selectedWidget: 'BUCKETGRID',
  data: {
    bucket: [],
    albums: [],
    photo: {
      comments: [],
    },
  },
};

const initialState = Map(fromJS(init));

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case stateTypes.LOAD_BUCKET_FULFILLED: {
      return state.setIn(['data'], (fromJS(action.payload)));
    }

    case stateTypes.SELECT_PHOTO_FULFILLED: {
      return state.setIn(['data', 'bucket'], fromJS(action.payload.bucket));
    }

    case stateTypes.ADD_BUCKET_TO_ALBUM: {
      return state;
    }

    case stateTypes.LOAD_ALBUMS_FULFILLED: {
      return state.setIn(['data', 'albums'], fromJS(action.payload.albums));
    }

    case stateTypes.SET_BUCKET_WIDGET: {
      return state.set('selectedWidget', action.payload.widget);
    }
  }
  return state;
}
