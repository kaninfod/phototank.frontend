import { combineReducers } from 'redux';
import { reducer as albumReducer }    from './album';
import { reducer as appReducer }      from './appState';
import { reducer as authReducer }     from './auth';
// import { reducer as bucketReducer }   from './bucket';
import { reducer as catalogReducer }  from './catalog';
import { reducer as locationReducer } from './location';
import { reducer as photoReducer }    from './photo';
import { reducer as uiReducer }       from './uiState';

export default combineReducers({
  app: appReducer,
  ui: uiReducer,
  nAlbum: albumReducer,
  nCatalog: catalogReducer,
  nLocation: locationReducer,
  nPhoto: photoReducer,
  nAuth: authReducer,
  // nBucket: bucketReducer,
});
