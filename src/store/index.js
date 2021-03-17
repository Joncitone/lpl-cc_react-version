import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import react from './react';
import angular from './angular';
import ember from './ember';
import vue from './vue';

const reducer = combineReducers({ react, angular, ember, vue });
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

const store = createStore(reducer, middleware);

export default store;
export * from './react';
export * from './angular';
export * from './ember';
export * from './vue';
