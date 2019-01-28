import { action } from 'typesafe-actions';

import {
    LOAD_STORE,
    SAVE_STORE,
    ADD_TODO,
    DELETE_TODO,
    CHANGE_TODO_STATUS,
    CHANGE_TODO_NAME
} from './ActionType';

export const loadStore = () => action(LOAD_STORE);

export const saveStore = () => action(SAVE_STORE);

export const addTodo = (payload: string) => action(ADD_TODO, payload);

export const deleteTodo = (payload: string) => action(DELETE_TODO, payload);

export const changeTodoStatus = (payload: string) =>
    action(CHANGE_TODO_STATUS, payload);

export const changeTodoName = (payload: {
    currentName: string;
    newName: string;
}) => action(CHANGE_TODO_NAME, payload);
