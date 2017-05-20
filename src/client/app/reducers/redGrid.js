import stateTypes from '../constants/stateTypes';
import { List, Map, fromJS } from 'immutable';

var init = {
  photos: [],
  countries: [],
  selectedPhoto: null,
  loading: true,
  pagination: {
    total: 0,
    total_pages: 0,
    first_page: true,
    last_page: false,
    previous_page: null,
    next_page: 1,
    out_of_bounds: false,
    offset: 0,
  },
};

const initialState = Map(fromJS(init));

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case stateTypes.CLICK_PHOTO: {
      return state.set('selectedPhoto', action.payload.selectedPhoto);
    }

    case stateTypes.DELETE_PHOTO_FULFILLED: {
      var photos = state.get('photos').filter(obj => {
        return obj.get('id') != action.payload.photo_id;
      });
      return state.set('photos', photos);
    }

    case stateTypes.SELECT_PHOTO_FULFILLED: {
      var photos = state.get('photos').map(photo => {
        if (photo.get('id') == action.payload.photo_id) {
          return (photo.update('bucket', flag => !photo.get('bucket')));
        } else {
          return photo;
        }
      });
      return state.set('photos', photos);
    }

    case stateTypes.LOAD_PHOTOS_PENDING: {
      return state.set('loading', true);
    }

    case stateTypes.SET_HEADER: {
      var pagination = JSON.parse(action.payload.get('x-pagination'));
      state = state.setIn(['pagination', 'total'], pagination.total)
        .setIn(['pagination', 'total_pages'], pagination.total_pages)
        .setIn(['pagination', 'first_page'], pagination.first_page)
        .setIn(['pagination', 'last_page'], pagination.last_page)
        .setIn(['pagination', 'previous_page'], pagination.previous_page)
        .setIn(['pagination', 'next_page'], pagination.next_page)
        .setIn(['pagination', 'out_of_bounds'], pagination.out_of_bounds)
        .setIn(['pagination', 'offset'], pagination.offset);
      return state;
    }

    case stateTypes.LOAD_PHOTOS_FULFILLED: {
      if (state.getIn(['pagination', 'out_of_bounds'])) {
        console.log('NO_MORE_PAGES');
        return state;
      }

      if (state.getIn(['pagination', 'first_page'])) {
        state = state.set('photos', fromJS(action.payload.photos));
        console.log('NEW GO', state.get('photos').size);
      } else {
        console.log('ADD_TO');
        state = state.set('photos', state.get('photos').concat(fromJS(action.payload.photos)));
        console.log('COUNT', state.get('photos').count());
        if (state.get('photos').count() > 200) {
          var cut = state.get('photos')//.takeLast(200);
          state = state.set('photos', cut);
        }

        console.log('COUNT', state.get('photos').count());
      }

      state = state.set('loading', true);
      return state;
    }

    case stateTypes.LOAD_COUNTRIES_FULFILLED: {
      return state.set('countries', fromJS(action.payload.countries));
    }

    case stateTypes.RESET_GRID: {
      return state.set('photos', fromJS([]));
    }

  }
  return state;
}
