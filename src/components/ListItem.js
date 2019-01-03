import React, { Component } from 'react';

class ListItem extends Component {
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

    render() {
        const { name, isDone } = this.props.data;

        return (
            <li>
                <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => this.changeStatus()}
                />
                <span>{name}</span>
                <button onClick={() => this.deleteTask()}>delete task</button>
            </li>
        );
    }
}

export default ListItem;
