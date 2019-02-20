import React, { Component, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
// @ts-ignore
import { Checkbox, Button, TextInput } from 'evergreen-ui';
import styled from 'styled-components';
import { IListItemProps, IListItemState } from '../interfaces';
import {
    deleteTodo,
    changeTodoStatus,
    changeTodoName,
    saveStore
} from '../actions/Actions';

const mapDispathToProps = {
    deleteTodo,
    changeTodoStatus,
    changeTodoName,
    saveStore
};

export const ListElement = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

class ListItem extends Component<IListItemProps, IListItemState> {
    constructor(props: IListItemProps) {
        super(props);
        this.state = {
            isEdit: false,
            newName: this.props.data.name
        };
    }

    changeStatus(): void {
        const {
            changeTodoStatus,
            saveStore,
            data: { name }
        } = this.props;

        changeTodoStatus(name);
        saveStore();
    }

    deleteTask(): void {
        const {
            deleteTodo,
            saveStore,
            data: { name }
        } = this.props;

        deleteTodo(name);
        saveStore();
    }

    toggleEdit(): void {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    updateName({ target: { value } }: any): void {
        this.setState({
            newName: value
        });
    }

    save(): void {
        const {
            changeTodoName,
            saveStore,
            data: { name }
        } = this.props;
        const { newName } = this.state;
        if (name === newName) return;

        changeTodoName({
            currentName: name,
            newName
        });
        saveStore();

        this.toggleEdit();
    }

    cancel(): void {
        const { name } = this.props.data;

        this.setState({
            newName: name
        });

        this.toggleEdit();
    }

    onKeyUp({ keyCode }: KeyboardEvent): void {
        switch (keyCode) {
            case 13:
                this.save();
                break;
            case 27:
                this.cancel();
                break;
            default:
                break;
        }
    }

    render() {
        const { name, isDone } = this.props.data;
        const { isEdit, newName } = this.state;

        if (isEdit) {
            return (
                <ListElement>
                    <TextInput
                        height={24}
                        type="text"
                        value={newName}
                        onKeyUp={(e: KeyboardEvent) => this.onKeyUp(e)}
                        onChange={(e: SyntheticEvent) => this.updateName(e)}
                    />
                    <div>
                        <Button
                            marginLeft={8}
                            height={24}
                            iconBefore="updated"
                            appearance="primary"
                            intent="success"
                            onClick={() => this.save()}
                        >
                            save
                        </Button>
                        <Button
                            marginLeft={8}
                            height={24}
                            iconBefore="undo"
                            appearance="primary"
                            intent="warning"
                            onClick={() => this.cancel()}
                        >
                            cancel
                        </Button>
                    </div>
                </ListElement>
            );
        } else {
            return (
                <ListElement>
                    <Checkbox
                        type="checkbox"
                        checked={isDone}
                        label={name}
                        onChange={() => this.changeStatus()}
                    />
                    <div>
                        <Button
                            height={24}
                            iconBefore="edit"
                            appearance="primary"
                            intent="none"
                            onClick={() => this.toggleEdit()}
                        >
                            edit
                        </Button>
                        <Button
                            height={24}
                            marginLeft={8}
                            iconBefore="delete"
                            appearance="primary"
                            intent="danger"
                            onClick={() => this.deleteTask()}
                        >
                            delete
                        </Button>
                    </div>
                </ListElement>
            );
        }
    }
}

export default connect(
    null,
    mapDispathToProps
)(ListItem);
