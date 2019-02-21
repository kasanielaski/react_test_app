import React, { useState, useEffect, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
// @ts-ignore
import { TextInput, Button } from 'evergreen-ui';
import styled from 'styled-components';
import ListItem from './ListItem';
import { IToDoListProps, IToDo } from '../interfaces';
import { loadStore, saveStore, addTodo } from '../actions/Actions';

const mapStateToProps = (state: IToDo[]) => state;

const mapDispathToProps = {
    loadStore,
    saveStore,
    addTodo
};

const Wrapper = styled.div`
    box-shadow: -3px 3px 8px 0 #c3c3c3;
    border-radius: 2px;
    padding: 16px;
`;

const List = styled.ul`
    margin-top: 8px;
`;

const ToDoList = ({ addTodo, loadStore, saveStore, todos }: IToDoListProps) => {
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        try {
            loadStore();
        } catch (error) {
            throw new Error(`there is problem with localStorage: ${error}`);
        }
    });

    function addItem(): void {
        if (userInput.trim() === '') {
            return;
        }

        addTodo(userInput);
        saveStore();
        setUserInput('');
    }

    function onKeyUp({ keyCode }: KeyboardEvent): void {
        switch (keyCode) {
            case 13:
                addItem();
                break;
            case 27:
                setUserInput('');
                break;
            default:
                break;
        }
    }

    function onChange({ target: { value } }: any): void {
        setUserInput(value);
    }

    const listitems: JSX.Element[] = todos.map((item, index: number) => (
        <ListItem key={`${item.name}_${index}`} data={item} />
    ));

    return (
        <Wrapper>
            <TextInput
                type="text"
                placeholder="Input task to add"
                value={userInput}
                onKeyUp={(e: KeyboardEvent) => onKeyUp(e)}
                onChange={(e: SyntheticEvent) => onChange(e)}
            />
            <Button marginLeft={8} iconBefore="add" onClick={() => addItem()}>
                add task
            </Button>
            <List>{listitems}</List>
        </Wrapper>
    );
};

export default connect(
    mapStateToProps,
    mapDispathToProps
)(ToDoList);
