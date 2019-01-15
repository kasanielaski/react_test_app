import React from 'react';
import { shallow } from 'enzyme';
import ListItem from './ListItem';

describe('renders', () => {
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
                name: '',
                isDone: false
            },
            onChangeStatus: undefined,
            onChangeName: undefined,
            onDeleteTask: undefined
        };
        mountedListItem = undefined;
    });

    it('render list elements', () => {
        const wrapper = listItem().find('li');
        expect(wrapper.length).toBeGreaterThan(0);
    });

    describe('list mode', () => {
        it('correct render list mode', () => {
            const wrapper = listItem().find('li');
            expect(wrapper).toExist();
            expect(wrapper.find({ type: 'checkbox' }).length).toBe(1);
            expect(wrapper.find('span').length).toBe(1);
            expect(wrapper.find('button').length).toBe(2);
            expect(wrapper.find('button').get(0).props.children).toBe('edit');
            expect(wrapper.find('button').get(1).props.children).toBe('delete');
        });

        it('correct name render', () => {
            const wrapper = listItem();
            const mockName = 'mockName';

            expect(wrapper.find('span').props().children).toBe('');
            wrapper.setProps({
                data: {
                    name: mockName,
                    isDone: false
                }
            });
            expect(wrapper.find('span').props().children).toBe(mockName);
        });

        it('correct checkbox value', () => {
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

    describe('edit mode', () => {
        beforeEach(() => {
            const wrapper = listItem();
            wrapper.setState({
                isEdit: true
            });
        });

        it('correct render edit mode', () => {
            const wrapper = listItem().find('li');
            expect(wrapper).toExist();
            expect(wrapper.find('input').length).toBe(1);
            expect(wrapper.find('button').length).toBe(2);
            expect(wrapper.find('button').get(0).props.children).toBe('save');
            expect(wrapper.find('button').get(1).props.children).toBe('cancel');
        });
    });
});
