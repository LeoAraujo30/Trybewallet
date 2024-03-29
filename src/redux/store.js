// configure aqui sua store

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk)),
);

export default store;

if (window.Cypress) {
  window.store = store;
}
