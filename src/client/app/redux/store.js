import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import combinedReducer from './combinedReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combinedReducer,
  composeEnhancers(
    applyMiddleware(promise(), thunk, logger())
  )
);
export default store;
