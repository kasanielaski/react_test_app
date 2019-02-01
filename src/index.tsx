import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

import { store } from './store';

import ToDoList from './components/ToDoList';
import Info from './components/Info';

import './index.css';

const Header = styled.header`
    display: flex;
    justify-content: center;
    position: fixed;
    width: 100%;
    padding: 16px 0;
    margin: 0 auto;
    top: 0;
    background-color: #fff;
    z-index: 1;
    box-shadow: -3px 3px 8px 0 #c3c3c3;
`;

const List = styled.li`
    display: inline-block;
    &:not(:first-of-type) {
        margin-left: 16px;
    }
`;

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <>
                <Header>
                    <nav>
                        <ul>
                            <List>
                                <Link to="/">App</Link>
                            </List>
                            <List>
                                <Link to="/info">Info</Link>
                            </List>
                        </ul>
                    </nav>
                </Header>
                <main>
                    <Route exact path="/" component={ToDoList} />
                    <Route exact path="/info" component={Info} />
                </main>
            </>
        </Router>
    </Provider>,
    document.getElementById('root')
);
