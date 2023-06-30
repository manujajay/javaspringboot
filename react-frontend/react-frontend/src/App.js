// File: src/App.js

import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    greeting: ''
  };

  componentDidMount() {
    fetch('http://localhost:8080/api/hello')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(message => {
        this.setState({greeting: message});
      })
      .catch(e => {
        console.log('There was a problem with your fetch operation: ' + e.message);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.greeting}</h1>
        </header>
      </div>
    );
  }
}

export default App;
