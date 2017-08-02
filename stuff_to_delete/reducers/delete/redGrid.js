import stateTypes from '../constants/stateTypes';
import { List, Map, fromJS, Set } from 'immutable';

var init = {


};

const initialState = Map(fromJS(init));

export default function reducer(state = initialState, action) {
  switch (action.type) {

    // case stateTypes.DELETE_PHOTO_FULFILLED: {
    //   var photos = state.get('photos').filter(obj => {
    //     return obj.get('id') != action.payload.photo_id;
    //   });
    //   return state.set('photos', photos);
    // }

    // case stateTypes.RESET_GRID: {
    //   return state.set('photos', fromJS([]));
    // }

  }
  return state;
}
