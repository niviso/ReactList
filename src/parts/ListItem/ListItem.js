import React, { Component } from 'react';
import Moment from 'react-moment';
import './ListItem.scss';
class ListItem extends Component{
  constructor(props) {
  super(props);
  this.state = {
    showTest : true
  }
  this.createTasks = this.createTasks.bind(this);
}

delete(key) {
  this.props.delete(key);
}

  createTasks = (item) => {
    return (
      <div className="listItem" key={item.key}>
      <div className="listItemText">{item.text}<p className="listItemDate">By 🞄 <b>{item.user}</b> 🞄 <Moment fromNow interval={30000} date={item.key}/></p></div>
      <div className="listItemRemove" onClick={() => this.delete(item.key)}><div className="checkBox"></div></div>

      </div>
    )
  }

  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);

    return (
      <div className="item-list">
          {listItems}
      </div>
    );
  }
};

export default ListItem;
