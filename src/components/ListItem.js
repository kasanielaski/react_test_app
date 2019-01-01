import React, { Component } from 'react';

class ListItem extends Component {
    onChange(event) {
        this.props.onStatusChange({
            name: this.props.data.name,
            isDone: !this.props.data.isDone
        });
    }

    render() {
        const { name, isDone } = this.props.data;

        return (
            <li>
                <input
                    type="checkbox"
                    checked={isDone}
                    onChange={e => this.onChange(e)}
                />
                <span>{name}</span>
            </li>
        );
    }
}

export default ListItem;
