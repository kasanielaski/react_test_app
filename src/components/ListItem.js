import React, { Component } from 'react';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name,
            isDone: this.props.data.done
        };
    }

    onChange(event) {
        this.setState({
            isDone: event.target.checked
        });
    }

    render() {
        return (
            <li>
                <input
                    name="toDoItem"
                    type="checkbox"
                    checked={this.state.isDone}
                    onChange={e => this.onChange(e)}
                />
                <span>{this.state.name}</span>
            </li>
        );
    }
}

export default ListItem;
