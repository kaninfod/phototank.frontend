import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import combinedReducer from './combinedReducer';
import Immutable from 'immutable';
import { apiService } from './apiUtils';

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,

  stateTransformer: (state) => {
    let newState = {};

    for (var i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }

    return newState;
  },
});

const store = createStore(
  combinedReducer,
  applyMiddleware(
    promise(),
    thunk,
    logger,
    apiService
  )
);
export default store;
