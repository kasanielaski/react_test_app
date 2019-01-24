import { combinedReducers } from 'redux';
import { LOCAL_STORAGE_KEY } from '../config';
import {
    LOAD_STORE,
    SAVE_STORE,
    ADD_TODO,
    DELETE_TODO,
    CHANGE_TODO_STATUS,
    CHANGE_TODO_NAME
} from '../actions';

const localStore = (state, action) => {
    switch (action.type) {
        case LOAD_STORE:
            return (state = [
                ...state,
                localStorage.getItem(LOCAL_STORAGE_KEY)
            ]);
        case SAVE_STORE:
            return localStore.setItem(LOCAL_STORAGE_KEY, action.payload);
        default:
            return state;
    }
};

const todos = (state, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                {
                    name: action.name,
                    isDone: false
                },
                ...state
            ];
        case DELETE_TODO:
            return state.filter(({ name }) => {
                return name !== action.name;
            });
        case CHANGE_TODO_STATUS:
            return state.map(({ name, isDone }) =>
                name === action.name
                    ? { name, isDone: !isDone }
                    : { name, isDone }
            );
        case CHANGE_TODO_NAME:
            return state.map(({ name, isDone }) =>
                name === action.payload.currentName
                    ? { isDone, name: action.payload.newName }
                    : { isDone, name }
            );
        default:
            return state;
    }
};

export default combinedReducers({
    localStore,
    todos
});
