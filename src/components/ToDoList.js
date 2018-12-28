import React, { Component } from 'react';

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <p>Sup</p>
        <h1>It's {this.state.date.toLocaleTimeString()}</h1>
      </div>
    );
  }
}

export default ToDoList;
