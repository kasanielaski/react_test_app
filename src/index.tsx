import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import ToDoList from './components/ToDoList';

import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <ToDoList />
    </Provider>,
    document.getElementById('root')
);
