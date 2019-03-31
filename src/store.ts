import { createStore, combineReducers } from 'redux';
import { Sample1Reducer, Sample1State } from './Sample1State';

export type AppState = {
  sample1: Sample1State
};

const store = createStore(
  combineReducers<AppState>({
    sample1: Sample1Reducer
  })
);

export default store;
