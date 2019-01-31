import { combineReducers } from 'redux';
import { IToDo } from '../interfaces';

import { LOCAL_STORAGE_KEY } from '../config';
import {
    LOAD_STORE,
    SAVE_STORE,
    ADD_TODO,
    DELETE_TODO,
    CHANGE_TODO_STATUS,
    CHANGE_TODO_NAME
} from '../actions/ActionType';

const todos = (state: IToDo[] = [], action: any) => {
    switch (action.type) {
        case LOAD_STORE:
            const formattedData = JSON.parse(
                localStorage.getItem(LOCAL_STORAGE_KEY)!
            );

            return (state = [...formattedData]);
        case SAVE_STORE:
            const rawData = JSON.stringify(state);
            localStorage.setItem(LOCAL_STORAGE_KEY, rawData);

            return state;
        case ADD_TODO:
            return [
                {
                    name: action.payload,
                    isDone: false
                },
                ...state
            ];
        case DELETE_TODO:
            return state.filter(({ name }) => {
                return name !== action.payload;
            });
        case CHANGE_TODO_STATUS:
            return state.map(({ name, isDone }) =>
                name === action.payload
                    ? { name, isDone: !isDone }
                    : { name, isDone }
            );
        case CHANGE_TODO_NAME:
            const { currentName, newName } = action.payload;
            return state.map(({ name, isDone }) =>
                name === currentName
                    ? { isDone, name: newName }
                    : { isDone, name }
            );
        default:
            return state;
    }
};

const todoApp = combineReducers({
    todos
});

export default todoApp;
