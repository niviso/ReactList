import React, { Component } from 'react';
import MyList from '../../parts/MyList/MyList';
import './MainView.scss';

class MainView extends Component {

  render() {
    return (
      <div className="MainView">
      <MyList />
      </div>
    );
  }
}

export default MainView;
