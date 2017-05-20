import { combineReducers } from "redux";
import grid from './redGrid';
import photoCard from './redPhotoCard';
import tagger from './redTagger';
import auth from './redAuth';
import bucket from './redBucket';
import catalog from './redCatalog';

export default combineReducers({
  grid,
  photoCard,
  tagger,
  auth,
  bucket,
  catalog,
});
