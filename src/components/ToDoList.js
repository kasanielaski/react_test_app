import React, { Component } from 'react';
// import ListItem from './ListItem';

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: []
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

  onKeyUp = event => {
    switch (event.keyCode) {
      case 13:
        this.setState({
          listData: [
            ...this.state.listData,
            {
              name: event.target.value.toString(),
              done: false
            }
          ]
        });
        event.target.value = '';
        break;
      case 27:
        event.target.value = '';
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div>
        <input onKeyUp={e => this.onKeyUp(e)} />
      </div>
    );
  }
}

export default ToDoList;
