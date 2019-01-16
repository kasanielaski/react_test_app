import React from 'react';
import { shallow } from 'enzyme';
import ToDoList from './ToDoList';

describe('ToDoList', () => {
    let mountedToDoList;

    const toDoList = () => {
        if (!mountedToDoList) {
            mountedToDoList = shallow(<ToDoList />);
        }
        return mountedToDoList;
    };

    beforeEach(() => {
        mountedToDoList = undefined;
    });

    it('render ToDoList', () => {
        const wrapper = toDoList();
        expect(wrapper.length).toBeGreaterThan(0);
    });

    describe('correct default render', () => {
        it('correct render default state', () => {
            const wrapper = toDoList();
            const container = wrapper.find('div');

            expect(container.find('input').length).toBeGreaterThan(0);
            expect(container.find('button').length).toBeGreaterThan(0);
            expect(container.find('ul').length).toBeGreaterThan(0);
        });

        it('correct input render', () => {
            const wrapper = toDoList();
            expect(wrapper.find('input').props().value).toBe(
                wrapper.state().inputValue
            );
        });

        it('correct ul render', () => {
            const wrapper = toDoList();

            expect(wrapper.find('ul').children().length).toBe(0);
        });
    });

    describe('correct mock state render', () => {
        it('correct listItems render', () => {
            const wrapper = toDoList();

            expect(wrapper.find('ul').children().length).toBe(0);
            wrapper.setState({
                listData: [
                    {
                        name: 'name',
                        isDone: false
                    }
                ]
            });
            expect(wrapper.find('ul').children().length).toBe(1);
            expect(
                wrapper
                    .find('ul')
                    .children()
                    .at(0)
                    .key()
            ).toBe(`${wrapper.state().listData[0].name}_0`);
            expect(
                wrapper
                    .find('ul')
                    .children()
                    .at(0)
                    .props().data
            ).toBe(wrapper.state().listData[0]);
            expect(
                wrapper
                    .find('ul')
                    .children()
                    .at(0)
                    .props().onChangeStatus
            ).toBeDefined();
            expect(
                wrapper
                    .find('ul')
                    .children()
                    .at(0)
                    .props().onChangeName
            ).toBeDefined();
            expect(
                wrapper
                    .find('ul')
                    .children()
                    .at(0)
                    .props().onDeleteTask
            ).toBeDefined();
        });
    });

    describe('correct actions', () => {
        it('correct `addItem` action', () => {
            const wrapper = toDoList();
            const instance = wrapper.instance();
            jest.spyOn(instance, 'addItem');

            wrapper.find('button').simulate('click');
            expect(instance.addItem).toHaveBeenCalled();
            expect(wrapper.state().listData.length).toBe(0);
        });

        it('correct `addItem` action with value', () => {
            const wrapper = toDoList();
            const instance = wrapper.instance();
            jest.spyOn(instance, 'addItem');

            wrapper.setState({
                inputValue: 'name'
            });
            wrapper.find('button').simulate('click');
            expect(instance.addItem).toHaveBeenCalled();
            expect(wrapper.state().listData.length).toBe(1);
        });

        it('correct `onKeyUp` action on `enter`', () => {
            const wrapper = toDoList();
            const instance = wrapper.instance();
            jest.spyOn(instance, 'addItem');

            instance.onKeyUp({ keyCode: 13 });
            expect(instance.addItem).toHaveBeenCalled();
        });

        it('correct `onKeyUp` action on `escape`', () => {
            const wrapper = toDoList();
            const instance = wrapper.instance();

            wrapper.setState({
                inputValue: 'name'
            });
            expect(wrapper.state().inputValue).toBe('name');
            instance.onKeyUp({ keyCode: 27 });
            expect(wrapper.state().inputValue).toBe('');
        });

        it('correct `onChange` action', () => {
            const wrapper = toDoList();
            const instance = wrapper.instance();

            instance.onChange({ target: { value: 'value' } });
            expect(wrapper.state().inputValue).toBe('value');
        });

        it('correct `onChangeStatus` action', () => {
            const wrapper = toDoList();
            const instance = wrapper.instance();

            instance.onChangeStatus({ name: 'name', isDone: true });
            expect(wrapper.state().listData[0].isDone).toBe(true);
        });

        it('correct `onChangeName` action', () => {
            const wrapper = toDoList();
            const instance = wrapper.instance();

            instance.onChangeName({ currentName: 'name', newName: 'newName' });
            expect(wrapper.state().listData[0].name).toBe('newName');
        });

        // @todo clear state before assert
        it('correct `onDeleteTask` action', () => {
            const wrapper = toDoList();
            const instance = wrapper.instance();

            instance.onDeleteTask({ name: 'newName' });
            expect(wrapper.state().listData.length).toBe(0);
        });
    });
});
