import {
    LOAD_STORE,
    SAVE_STORE,
    ADD_TODO,
    DELETE_TODO,
    CHANGE_TODO_STATUS,
    CHANGE_TODO_NAME
} from './ActionType';

export const loadStore = () => ({ type: LOAD_STORE });

export const saveStore = payload => {
    return {
        type: SAVE_STORE,
        payload
    };
};

export const addTodo = name => {
    return {
        type: ADD_TODO,
        name
    };
};

export const deleteTodo = name => {
    return {
        type: DELETE_TODO,
        name
    };
};

export const changeTodoStatus = name => {
    return {
        type: CHANGE_TODO_STATUS,
        name
    };
};

export const changeTodoName = payload => {
    return {
        type: CHANGE_TODO_NAME,
        payload
    };
};
