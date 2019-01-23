import React, { Component } from 'react';
import { Checkbox, Button, TextInput } from 'evergreen-ui';
import styled from 'styled-components';

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
        this.props.onChangeStatus({
            name: this.props.data.name,
            isDone: !this.props.data.isDone
        });
    }
    span;

    deleteTask() {
        this.props.onDeleteTask({
            name: this.props.data.name
        });
    }

    toggleEdit() {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    updateName(e) {
        this.setState({
            newName: e.target.value
        });
    }

    save() {
        const { name } = this.props.data;
        const { newName } = this.state;
        if (name === newName) return;

        this.props.onChangeName({
            currentName: name,
            newName
        });

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
                    <div>
                        <TextInput
                            height={24}
                            type="text"
                            value={newName}
                            onKeyUp={e => this.onKeyUp(e)}
                            onChange={e => this.updateName(e)}
                        />
                    </div>

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
                    <div>
                        <Checkbox
                            type="checkbox"
                            checked={isDone}
                            label={name}
                            onChange={() => this.changeStatus()}
                        />
                    </div>

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

export default ListItem;
