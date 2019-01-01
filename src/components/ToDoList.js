import React, { Component } from 'react';
import ListItem from './ListItem';

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            inputValue: ''
        };
    }

    // componentWillMount() {
    //     if (Object.keys(this.state.listData).length === 0) {
    //         const storedData = JSON.parse(localStorage.getItem("listData"));
    //         this.setState({
    //             listData: storedData
    //         });
    //     }
    // }

    addItem() {
        this.setState({
            listData: [
                ...this.state.listData,
                {
                    name: this.state.inputValue.toString(),
                    done: false
                }
            ],
            inputValue: ''
        });
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case 13:
                this.addItem();
                break;
            case 27:
                this.setState({
                    inputValue: ''
                });
                break;
            default:
                break;
        }
    }

    onClick() {
        this.addItem();
    }

    onChange(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    render() {
        const listitems = this.state.listData.map(item => (
            <ListItem key={item.name} data={item} />
        ));

        return (
            <div>
                <input
                    type="text"
                    value={this.state.inputValue}
                    onKeyUp={e => this.onKeyUp(e)}
                    onChange={e => this.onChange(e)}
                />
                <button onClick={e => this.onClick(e)}>add task</button>
                <ul>{listitems}</ul>
            </div>
        );
    }
}

export default ToDoList;
