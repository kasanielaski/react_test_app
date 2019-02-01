import React from 'react';
import { shallow } from 'enzyme';
import ListItem, { ListElement } from './ListItem';
import { Checkbox, Button } from 'evergreen-ui';
import TextInput from 'evergreen-ui/commonjs/text-input/src/TextInput';

// @todo fix tests
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
        const wrapper = listItem();
        expect(wrapper.find(ListElement).length).toBeGreaterThan(0);
    });

    describe('list mode', () => {
        describe('correct renders', () => {
            it('correct list render', () => {
                const wrapper = listItem();
                expect(wrapper.find(Checkbox).length).toBe(1);
                expect(wrapper.find(Button).length).toBe(2);
                expect(wrapper.find(Checkbox).props().label).toBe(
                    wrapper.instance().props.data.name
                );
                expect(wrapper.find(Button).get(0).props.children).toBe('edit');
                expect(wrapper.find(Button).get(1).props.children).toBe(
                    'delete'
                );
            });

            it('correct checkbox label render', () => {
                const wrapper = listItem();
                const mockName = 'mockName';

                expect(wrapper.find(Checkbox).props().label).toBe('default');
                wrapper.setProps({
                    data: {
                        name: mockName,
                        isDone: false
                    }
                });
                expect(wrapper.find(Checkbox).props().label).toBe(mockName);
            });

            it('correct checkbox render', () => {
                const wrapper = listItem();
                const mockValue = true;

                expect(wrapper.find(Checkbox).props().checked).toBe(false);
                wrapper.setProps({
                    data: {
                        name: '',
                        isDone: mockValue
                    }
                });
                expect(wrapper.find(Checkbox).props().checked).toBe(mockValue);
            });
        });

        describe('correct actions', () => {
            it('correct `changeStatus` action', () => {
                props.onChangeStatus = jest.fn();
                const wrapper = listItem();
                const instance = wrapper.instance();

                jest.spyOn(instance, 'changeStatus');
                wrapper.find(Checkbox).simulate('change');
                expect(instance.changeStatus).toHaveBeenCalled();
            });

            it('correct `toggleEdit` action', () => {
                const wrapper = listItem();
                const instance = wrapper.instance();
                jest.spyOn(instance, 'toggleEdit');
                wrapper
                    .find(Button)
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
                    .find(Button)
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
                const wrapper = listItem();
                expect(wrapper.find(ListElement).length).toBe(1);
                expect(wrapper.find(TextInput).length).toBe(1);
                expect(wrapper.find(Button).length).toBe(2);
                expect(wrapper.find(Button).get(0).props.children).toBe('save');
                expect(wrapper.find(Button).get(1).props.children).toBe(
                    'cancel'
                );
            });

            it('correct input render', () => {
                const wrapper = listItem();
                const mockName = 'mockName';

                expect(wrapper.find(TextInput).props().value).toBe('default');
                wrapper.setState({
                    newName: mockName
                });
                expect(wrapper.find(TextInput).props().value).toBe(mockName);
            });
        });

        describe('correct actions', () => {
            it('correct `save` action', () => {
                const wrapper = listItem();
                const instance = wrapper.instance();
                jest.spyOn(instance, 'save');
                wrapper
                    .find(Button)
                    .first()
                    .simulate('click');
                expect(instance.save).toHaveBeenCalled();
            });

            it('correct `cancel` action', () => {
                const wrapper = listItem();
                const instance = wrapper.instance();
                jest.spyOn(instance, 'cancel');
                wrapper
                    .find(Button)
                    .last()
                    .simulate('click');
                expect(instance.cancel).toHaveBeenCalled();
                expect(wrapper.state().isEdit).toBe(false);
            });
        });
    });
});
