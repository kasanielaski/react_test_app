import React, { Component } from 'react';

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
                <li>
                    <input
                        type="text"
                        value={newName}
                        onKeyUp={e => this.onKeyUp(e)}
                        onChange={e => this.updateName(e)}
                    />
                    <button onClick={() => this.save()}>save</button>
                    <button onClick={() => this.cancel()}>cancel</button>
                </li>
            );
        } else {
            return (
                <li>
                    <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => this.changeStatus()}
                    />
                    <span>{name}</span>
                    <button onClick={() => this.toggleEdit()}>edit</button>
                    <button onClick={() => this.deleteTask()}>delete</button>
                </li>
            );
        }
    }
}

export default ListItem;
