import React, { Component } from 'react';
import './App.css';
import MainView from './views/MainView/MainView';
class App extends Component {
  render() {
    return (
      <div className="app">
      <MainView />
      </div>
    );
  }
}

export default App;
