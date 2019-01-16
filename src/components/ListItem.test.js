import React from 'react';
import { shallow } from 'enzyme';
import ListItem from './ListItem';

describe('ListItem', () => {
    let props;
    let mountedListItem;

    const listItem = () => {
        if (!mountedListItem) {
            mountedListItem = shallow(<ListItem {...props} />);
        }
        return mountedListItem;
    };

    beforeEach(() => {
        props = {
            data: {
                name: 'default',
                isDone: false
            },
            onChangeStatus: undefined,
            onChangeName: undefined,
            onDeleteTask: undefined
        };
        mountedListItem = undefined;
    });

    it('render ListItem', () => {
        const wrapper = listItem().find('li');
        expect(wrapper.length).toBeGreaterThan(0);
    });

    describe('list mode', () => {
        describe('correct renders', () => {
            it('correct list render', () => {
                const wrapper = listItem().find('li');
                expect(wrapper).toExist();
                expect(wrapper.find({ type: 'checkbox' }).length).toBe(1);
                expect(wrapper.find('span').length).toBe(1);
                expect(wrapper.find('button').length).toBe(2);
                expect(wrapper.find('button').get(0).props.children).toBe(
                    'edit'
                );
                expect(wrapper.find('button').get(1).props.children).toBe(
                    'delete'
                );
            });

            it('correct span render', () => {
                const wrapper = listItem();
                const mockName = 'mockName';

                expect(wrapper.find('span').props().children).toBe('default');
                wrapper.setProps({
                    data: {
                        name: mockName,
                        isDone: false
                    }
                });
                expect(wrapper.find('span').props().children).toBe(mockName);
            });

            it('correct checkbox render', () => {
                const wrapper = listItem();
                const mockValue = true;

                expect(wrapper.find({ type: 'checkbox' }).props().checked).toBe(
                    false
                );
                wrapper.setProps({
                    data: {
                        name: '',
                        isDone: mockValue
                    }
                });
                expect(wrapper.find({ type: 'checkbox' }).props().checked).toBe(
                    mockValue
                );
            });
        });

        describe('correct actions', () => {
            it('correct `changeStatus` action', () => {
                props.onChangeStatus = jest.fn();
                const wrapper = listItem();
                const instance = wrapper.instance();

                jest.spyOn(instance, 'changeStatus');
                wrapper.find({ type: 'checkbox' }).simulate('change');
                expect(instance.changeStatus).toHaveBeenCalled();
            });

            it('correct `toggleEdit` action', () => {
                const wrapper = listItem();
                const instance = wrapper.instance();
                jest.spyOn(instance, 'toggleEdit');
                wrapper
                    .find('button')
                    .first()
                    .simulate('click');
                expect(instance.toggleEdit).toHaveBeenCalled();
                expect(wrapper.state().isEdit).toBe(true);
            });

            it('correct `deleteTask` action', () => {
                props.onDeleteTask = jest.fn();
                const wrapper = listItem();
                const instance = wrapper.instance();

                jest.spyOn(instance, 'deleteTask');
                wrapper
                    .find('button')
                    .last()
                    .simulate('click');
                expect(instance.deleteTask).toHaveBeenCalled();
            });
        });
    });

    describe('edit mode', () => {
        beforeEach(() => {
            const wrapper = listItem();
            wrapper.setState({
                isEdit: true
            });
        });

        describe('correct renders', () => {
            it('correct edit mode render', () => {
                const wrapper = listItem().find('li');
                expect(wrapper).toExist();
                expect(wrapper.find('input').length).toBe(1);
                expect(wrapper.find('button').length).toBe(2);
                expect(wrapper.find('button').get(0).props.children).toBe(
                    'save'
                );
                expect(wrapper.find('button').get(1).props.children).toBe(
                    'cancel'
                );
            });

            it('correct input render', () => {
                const wrapper = listItem();
                const mockName = 'mockName';

                expect(wrapper.find('input').props().value).toBe('default');
                wrapper.setState({
                    newName: mockName
                });
                expect(wrapper.find('input').props().value).toBe(mockName);
            });
        });

        describe('correct actions', () => {
            it('correct `save` action', () => {
                const wrapper = listItem();
                const instance = wrapper.instance();
                jest.spyOn(instance, 'save');
                wrapper
                    .find('button')
                    .first()
                    .simulate('click');
                expect(instance.save).toHaveBeenCalled();
            });

            it('correct `cancel` action', () => {
                const wrapper = listItem();
                const instance = wrapper.instance();
                jest.spyOn(instance, 'cancel');
                wrapper
                    .find('button')
                    .last()
                    .simulate('click');
                expect(instance.cancel).toHaveBeenCalled();
                expect(wrapper.state().isEdit).toBe(false);
            });
        });
    });
});
