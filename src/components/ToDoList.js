import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput, Button } from 'evergreen-ui';
import styled from 'styled-components';
import ListItem from './ListItem';
import { loadStore, saveStore, addTodo } from '../actions/Actions';

const mapStateToProps = state => state;

const mapDispathToProps = {
    loadStore,
    saveStore,
    addTodo
};

const Wrapper = styled.div`
    box-shadow: -3px 3px 8px 0 #c3c3c3;
    border-radius: 2px;
    padding: 16px;
`;

const List = styled.ul`
    margin-top: 8px;
`;

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
    }

    componentWillMount() {
        try {
            this.props.loadStore();
        } catch (error) {
            throw new Error(`there is problem with localStorage: ${error}`);
        }
    }

    addItem() {
        if (this.state.input.trim() === '') {
            return;
        }

        this.props.addTodo(this.state.input);
        this.props.saveStore();
        this.setState({
            input: ''
        });
    }

    onKeyUp({ keyCode }) {
        switch (keyCode) {
            case 13:
                this.addItem();
                break;
            case 27:
                this.setState({
                    input: ''
                });
                break;
            default:
                break;
        }
    }

    onChange({ target: { value } }) {
        this.setState({
            input: value
        });
    }

    render() {
        const listitems = this.props.todos.map((item, index) => (
            <ListItem key={`${item.name}_${index}`} data={item} />
        ));

        return (
            <Wrapper>
                <TextInput
                    type="text"
                    placeholder="Input task"
                    value={this.state.input}
                    onKeyUp={e => this.onKeyUp(e)}
                    onChange={e => this.onChange(e)}
                />
                <Button
                    marginLeft={8}
                    iconBefore="add"
                    onClick={() => this.addItem()}
                >
                    add task
                </Button>
                <List>{listitems}</List>
            </Wrapper>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispathToProps
)(ToDoList);
