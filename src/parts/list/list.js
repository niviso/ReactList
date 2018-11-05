import React, { Component } from 'react';
import ListItem from '../../parts/list-item/list-item';
import LocalStorageHelper from '../../helpers/LocalStorageHelper';
import StringHelper from '../../helpers/StringHelper';
import ListInput from '../../parts/list-input/list-input';
import UserManager from '../../managers/UserManager';
class List extends Component{
  constructor(props) {
    super(props);
    this.state = {
       items: [],
       historyItems : [],
       input : null
     };


  }
  componentDidMount(){
      this.getItems();
  }
  getItems = () => {
    this.setState((prevState) => {
      return {
        items: JSON.parse(LocalStorageHelper.getStorage("list"))
      };
    });

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
        LocalStorageHelper.setStorage(JSON.stringify(this.state.items));
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
    LocalStorageHelper.setStorage(JSON.stringify(this.state.items));
    this.state.input.value = "";
  });
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
      <div className="listTitle">Nikkis list</div>
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