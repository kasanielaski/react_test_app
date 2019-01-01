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

    componentWillMount() {
        if (
            this.state.listData.length === 0 &&
            localStorage.getItem('listData') !== null
        ) {
            const recoveredData = JSON.parse(localStorage.getItem('listData'));
            this.setState({
                listData: recoveredData
            });
        }
    }

    async addItem() {
        if (this.state.inputValue.trim() === '') {
            return;
        }

        await this.setState({
            listData: [
                ...this.state.listData,
                {
                    name: this.state.inputValue.toString(),
                    done: false
                }
            ],
            inputValue: ''
        });
        this.storeData();
    }

    storeData() {
        const formattedData = JSON.stringify(this.state.listData);
        localStorage.setItem('listData', formattedData);
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
