import {
    LOAD_STORE,
    SAVE_STORE,
    ADD_TODO,
    DELETE_TODO,
    CHANGE_TODO_STATUS,
    CHANGE_TODO_NAME
} from './ActionType';

export const loadStore = () => ({ type: LOAD_STORE });

export const saveStore = () => ({ type: SAVE_STORE });

export const addTodo = payload => {
    return {
        type: ADD_TODO,
        payload
    };
};

export const deleteTodo = payload => {
    return {
        type: DELETE_TODO,
        payload
    };
};

export const changeTodoStatus = payload => {
    return {
        type: CHANGE_TODO_STATUS,
        payload
    };
};

export const changeTodoName = payload => {
    return {
        type: CHANGE_TODO_NAME,
        payload
    };
};
