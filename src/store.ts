import { createStore } from 'redux';
import todoApp from './reducers/Reducers';

const initialState = {};

const store = createStore(todoApp, initialState);

export default store;
