import { requestTypes } from './apiUtils';
import { List, Map, fromJS } from 'immutable';

// Reducer
var init = Map(fromJS({
  albums: [],
  album: {
    start: null,
    end: null,
  },
  loadedAt: {
    albums: false,
  },
}));

var newState = null;

export function reducer(state=init, action={}) {
  switch (action.type) {

    case 'FETCH_ALBUMS_SUCCESS': {
      if (!action.payload) { return state; }

      state = state.set('albums', fromJS(action.payload.albums));
      return state.setIn(['loadedAt', 'albums'], Date());
    }

    case 'FETCH_ALBUM_SUCCESS': {
      newState = state.set('album', fromJS(action.payload.album));
      return newState;
    }

    case 'CREATE_ALBUM_SUCCESS': {
      newState = state.set('album', fromJS(action.payload));
      return newState;
    }

    case 'UPDATE_ALBUM_SUCCESS': {
      return state.set('album', fromJS(action.payload.album));
    }

    case 'DELETE_ALBUM_SUCCESS': {
      const albums = state.get('albums').filter(album =>
        album.get('id') !== action.payload.id);
      return state.set('albums', albums);
    }
  }
  return state;
}

//API
export function fetchAlbums() {
  return {
    isAPI: true,
    type: 'FETCH_ALBUMS',
    url: '/api/albums',
    httpVerb: requestTypes.GET,
    params: null,
    loadedAtIdentifier: ['nAlbum', 'loadedAt', 'albums'],
  };
}

export function fetchAlbum(id) {
  return {
    isAPI: true,
    type: 'FETCH_ALBUM',
    url: '/api/albums/'.concat(id),
    httpVerb: requestTypes.GET,
    params: null,
  };
}

export function createAlbum(payload) {
  return {
    isAPI: true,
    type: 'CREATE_ALBUM',
    url: '/api/albums/',
    httpVerb: requestTypes.POST,
    params: payload,
  };
}

export function updateAlbum(payload) {
  return {
    isAPI: true,
    type: 'UPDATE_ALBUM',
    url: '/api/albums/'.concat(payload.id),
    httpVerb: requestTypes.PUT,
    params: payload,
  };
}

export function deleteAlbum(albumId) {
  return {
    isAPI: true,
    type: 'DELETE_ALBUM',
    url: '/api/photos/'.concat(albumId, '/comment/delete'),
    httpVerb: requestTypes.DELETE,
    params: null,
  };
}
