import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';


class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: 'http://127.0.0.1:3001', // connecting to localhost endpoint for sockets (will change to prod endpoint in future)
      users: [],
      word: 'warriors'
    };
  }

  // method for emitting a socket.io event
  sendWord = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('set word', this.state.word);
    // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments
  };

  setWord = word => {
    this.setState({ word });
  };

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    const socket = socketIOClient(this.state.endpoint); // TO-DO will move this logic to separate components
    socket.on('set word', word => {
      // setting the color of our button
      document.title = word;
    });
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user => <div key={user.id}>{user.username}</div>)}

        <div style={{ textAlign: 'center' }}>
          <button onClick={() => this.sendWord()}>Change Word</button>
          <button id="nike" onClick={() => this.setWord('nike')}>
            Nike
          </button>
          <button id="adidas" onClick={() => this.setWord('adidas')}>
            Adidas
          </button>
        </div>

      </div>
    );
  }
}

export default App;
