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
        const el = listItem().find('li');
        expect(el.length).toBeGreaterThan(0);
    });

    describe('list mode', () => {
        it('render list element correct', () => {
            const el = listItem().find('li');
            expect(el).toExist();
            expect(el.find({ type: 'checkbox' }).length).toBe(1);
            expect(el.find('span').length).toBe(1);
            expect(el.find('button').length).toBe(2);
            expect(
                el
                    .find('button')
                    .first()
                    .text()
            ).toBe('edit');
            console.log(el.props());
        });
    });
});
