import stateTypes from '../constants/stateTypes';
import { List, Map, fromJS } from 'immutable';

var init = {
  selectedWidget: 'INFO',
  hidden: true,
  photoId: null,
  cardData: {},
};

const initialState = Map(fromJS(init));

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // case stateTypes.LOAD_PHOTO_FULFILLED: {
    //   var newState = state
    //       .set('photoId', action.payload.photo.id)
    //       .set('hidden', false)
    //       .set('cardData', fromJS(action.payload));
    //   return newState;
    // }

    // case stateTypes.CLICK_PHOTO: {
    //   return state.set('photoId', action.payload.selectedPhoto).set('hidden', false);
    // }

    // case stateTypes.SET_WIDGET: {
    //   return state.set('selectedWidget', action.payload.widget);
    // }

    // case stateTypes.ADD_COMMENT_FULFILLED: {
    //   return state.setIn(['cardData', 'comments'], fromJS(action.payload.comments));
    // }

    // case stateTypes.LIKE_PHOTO_FULFILLED: {
    //   return state.setIn(['cardData', 'photo', 'like'], action.payload.liked_by_current_user);
    // }
  }
  return state;
}
