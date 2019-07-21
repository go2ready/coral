import { createStore, applyMiddleware, compose } from 'redux';

import { rootReducer } from './reducers/Index';

declare global {
  interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const composeEnhancers =
  (
    // process.env.NODE_ENV === 'development' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

function configureStore(initialState?: object) {
    // configure middlewares
    const middlewares : any[] = [];
    // compose enhancers
    const enhancer = composeEnhancers(applyMiddleware(...middlewares));
    // create store
    return createStore(rootReducer, initialState!, enhancer);
}

// pass an optional param to rehydrate state on app start
// and export store singleton instance
export const store = configureStore();