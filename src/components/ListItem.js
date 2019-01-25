import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Button, TextInput } from 'evergreen-ui';
import styled from 'styled-components';
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

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            newName: this.props.data.name
        };
    }

    changeStatus() {
        this.props.changeTodoStatus(this.props.data.name);
        this.props.saveStore();
    }

    deleteTask() {
        this.props.deleteTodo(this.props.data.name);
        this.props.saveStore();
    }

    toggleEdit() {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    updateName({ target: { value } }) {
        this.setState({
            newName: value
        });
    }

    save() {
        const { name } = this.props.data;
        const { newName } = this.state;
        if (name === newName) return;

        this.props.changeTodoName({
            currentName: name,
            newName
        });
        this.props.saveStore();

        this.toggleEdit();
    }

    cancel() {
        this.setState({
            newName: this.props.data.name
        });

        this.toggleEdit();
    }

    onKeyUp(event) {
        switch (event.keyCode) {
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
                        onKeyUp={e => this.onKeyUp(e)}
                        onChange={e => this.updateName(e)}
                    />

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
                </ListElement>
            );
        }
    }
}

export default connect(
    null,
    mapDispathToProps
)(ListItem);
