import stateTypes from '../constants/stateTypes';
import { List, Map, fromJS } from 'immutable';

var init = {
  catalogs: [],
  albums: [],
  catalog: { },
  loading: false,
};

const initialState = Map(fromJS(init));

export default function reducer(state = initialState, action) {
  switch (action.type) {

    // case stateTypes.LOAD_CATALOGS_FULFILLED: {
    //   state = state.set('catalogs', fromJS(action.payload.catalogs))
    //   .set('catalog', Map());
    //   return state;
    // }

    // case stateTypes.LOAD_ALBUMS_FULFILLED: {
    //   state = state.set('albums', fromJS(action.payload.albums));
    //   return state;
    // }

    // case stateTypes.GET_CATALOG_PENDING: {
    //   state = state.set('loading', true);
    //   return state;
    // }

    // case stateTypes.GET_CATALOG_FULFILLED: {
    //   console.log(action);
    //   state = state.set('catalog', fromJS(action.payload.catalog))
    //           .set('loading', false);
    //   return state;
    // }

    // case stateTypes.CREATE_CATALOG_PENDING: {
    //   state = state.set('loading', true);
    //   return state;
    // }
    //
    // case stateTypes.CREATE_CATALOG_FULFILLED: {
    //   state = state.set('catalog', fromJS(action.payload.catalog))
    //           .set('loading', false);
    //   return state;
    // }

    // case stateTypes.UPDATE_CATALOG_FULFILLED: {
    //
    //   state = state.mergeDeep(fromJS(action.payload));
    //   return state;
    // }

    // case stateTypes.VERIFY_DROPBOX_PENDING: {
    //   state = state.set('loading', true);
    //   return state;
    // }
    //
    // case stateTypes.VERIFY_DROPBOX_FULFILLED: {
    //   state = state.mergeDeep(fromJS(action.payload))
    //           .set('loading', false);
    //   return state;
    // }

    // case stateTypes.NEW_CATALOG: {
    //   state = state.set('catalog', {});
    //   return state;
    // }

  }

  return state;
}
