import React, { Component } from 'react';
import List from '../../parts/list/list';
import './MainView.css';

class MainView extends Component {

  render() {
    return (
      <div className="MainView">
      <List />
      </div>
    );
  }
}

export default MainView;