import { createStore } from 'redux';
import todoApp from './reducers/Reducers';

const store = createStore(todoApp);

export default store;
