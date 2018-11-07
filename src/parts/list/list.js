import React, { Component } from 'react';
import ListItem from '../../parts/ListItem/ListItem';
import LocalStorageHelper from '../../helpers/LocalStorageHelper';
import StringHelper from '../../helpers/StringHelper';
import ListInput from '../../parts/ListInput/ListInput';
import ListTitle from '../../parts/ListTitle/ListTitle';

import UserManager from '../../managers/UserManager';
class List extends Component{
  constructor(props) {
    super(props);
    this.state = {
       id: 1,
       title: "",
       items: [],
       historyItems : [],
       input : null
     };


  }
  componentDidMount(){
    if(!this.state.title){
      this.setState({
        title: "New List " + this.state.id
      })
    }
      this.getItems();
  }
  getItems = () => {
    let list = JSON.parse(LocalStorageHelper.getStorage("launcher_items_"+this.state.id));
    if(list){
      this.setState((prevState) => {
        return {
          title: list.title || "My list",
          items: list.items || []
        };
      });
    }

  }
  addItem = () => {
    if (this.state.input.value !== "") {
      var newItem = {
        text: this.state.input.value,
        user: UserManager.user,
        key: Date.now()
      };

      this.setState((prevState) => {
        return {
          items: prevState.items.concat(newItem)
        };
      }, () => {
        this.save();
        this.state.input.value = "";
      });
    }
  }
  deleteItem = (key) => {
  var filteredItems = this.state.items.filter(function (item) {
    return (item.key !== key);
  });

  var newHistoryItems = this.state.items.filter(function (item) {
    return (item.key === key);
  });

  newHistoryItems = this.state.historyItems.concat(newHistoryItems);
  this.setState({
    items: filteredItems,
    historyItems: newHistoryItems
  }, () => {
    this.save();
    this.state.input.value = "";
  });
}

getList = () => {
  return JSON.stringify({
    title: this.state.title,
    items: this.state.items
  });
}

updateTitle = (title) => {
  this.setState({
    title: title
  },() => {
    this.save();
  });
}

save = () => {
  LocalStorageHelper.setStorage(this.getList(),"launcher_items_"+this.state.id);
}

keyInput = (e) => {

  if(this.state.input.value.length === 0){
    return;
  }
  if(this.state.input.value.length === 1 && StringHelper.isLowerCase(this.state.input.value)){
    this.state.input.value = StringHelper.capitalizeFirstLetter(this.state.input.value);
  }

  if(e.keyCode === 13){
    this.addItem();
  }
  e.preventDefault();

}
setInput = (a) => {
    this.setState((prevState) => {
      return {
        input: a
      };
    });
}
  render() {
    return (
      <div className="listWrapper">
      <ListTitle updateTitle={this.updateTitle} title={this.state.title}/>
      <ListInput keyinput={this.keyInput} setinput={this.setInput}/>
      <div className="list">
        <ListItem entries={this.state.items} delete={this.deleteItem}/>

        {this.state.items.length == 0 && this.state.historyItems.length > 0 ? (
        <div className="emptyList">
        <img src="https://cdn.icon-icons.com/icons2/390/PNG/512/white-cat_38735.png" alt="" width="100"/>
        <p>Good job completing your list</p>
        </div> )
        : ''}

        {this.state.items.length == 0 && this.state.historyItems.length == 0 ? (
        <div className="emptyList">
        <img src="https://static.thenounproject.com/png/70551-200.png" alt="" width="100"/>
        <p>Try adding something to your list!</p>
        </div> )
        : ''}
      </div>
      </div>
    );
  }
}
export default List;
