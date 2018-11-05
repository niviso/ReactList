import React, { Component } from 'react';
import './App.css';
import MainView from './views/MainView/MainView';
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="app">
      <MainView />
      </div>
    );
  }
}

export default App;
