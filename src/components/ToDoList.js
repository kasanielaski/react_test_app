import React, { Component } from 'react';
import ListItem from './ListItem';
import { LOCAL_STORAGE_KEY } from '../config';

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
            inputValue: ''
        };
    }

    componentWillMount() {
        try {
            if (
                this.state.listData.length === 0 &&
                localStorage.getItem(LOCAL_STORAGE_KEY) !== null
            ) {
                const listData = JSON.parse(
                    localStorage.getItem(LOCAL_STORAGE_KEY)
                );
                this.setState({
                    listData
                });
            }
        } catch (error) {
            throw new Error(`there is problem with localStorage: ${error}`);
        }
    }

    addItem() {
        if (this.state.inputValue.trim() === '') {
            return;
        }

        this.setState(
            {
                listData: [
                    ...this.state.listData,
                    {
                        name: this.state.inputValue.toString(),
                        isDone: false
                    }
                ],
                inputValue: ''
            },
            this.storeData
        );
    }

    storeData() {
        const formattedData = JSON.stringify(this.state.listData);
        localStorage.setItem(LOCAL_STORAGE_KEY, formattedData);
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

    onChange(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    onChangeStatus({ name, isDone }) {
        this.setState(
            {
                listData: [
                    ...this.state.listData.map(item =>
                        item.name === name ? { name, isDone } : item
                    )
                ]
            },
            this.storeData
        );
    }

    onChangeName({ currentName, newName }) {
        this.setState(
            {
                listData: [
                    ...this.state.listData.map(item =>
                        item.name === currentName
                            ? { name: newName, ...item }
                            : item
                    )
                ]
            },
            this.storeData
        );
    }

    onDeleteTask({ name }) {
        this.setState(
            {
                listData: [
                    ...this.state.listData.filter(item => {
                        return item.name !== name;
                    })
                ]
            },
            this.storeData
        );
    }

    render() {
        const listitems = this.state.listData.map((item, index) => (
            <ListItem
                key={`${item.name}_${index}`}
                data={item}
                onChangeStatus={e => this.onChangeStatus(e)}
                onChangeName={e => this.onChangeName(e)}
                onDeleteTask={e => this.onDeleteTask(e)}
            />
        ));

        return (
            <div>
                <input
                    type="text"
                    value={this.state.inputValue}
                    onKeyUp={e => this.onKeyUp(e)}
                    onChange={e => this.onChange(e)}
                />
                <button onClick={() => this.addItem()}>add task</button>
                <ul>{listitems}</ul>
            </div>
        );
    }
}

export default ToDoList;
