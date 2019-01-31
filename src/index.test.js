import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import ToDoList from './components/ToDoList';

it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(ToDoList).length).toBe(1);
});
