import React, { Component } from 'react';
import './App.scss';
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
