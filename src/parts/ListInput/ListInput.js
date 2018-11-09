import React, { Component } from 'react';
import './ListInput.scss';
import StringHelper from '../../helpers/StringHelper';
class ListInput extends Component{
  constructor(props) {
  super(props);
  this.value = null;
  this.state = {
    showClean : false,
    focused: false,
    autoSuggest: null
   };

}
componentDidMount(){
    this.setInput();
}

autoSuggest = () => {
  if(this.input.value.length == 0 && this.props.history.length == 0){
    return null;
  }
  var arr = this.props.history.filter( (item) => {
    return (item.text.indexOf(this.input.value) > -1);
  });

  if(arr.length > 0){
    return  arr[0].text;
  }

  return null;
}
keyInput = (e) => {
  this.props.keyinput(e);
  setTimeout(x=>{
    this.ToggleClean();
  },1);
  if(e.keyCode === 13){
    return;
  }

  this.setState({
    autoSuggest: this.autoSuggest()
  });
}

setInput = () => {
  this.props.setinput(this.input);
}


clear = () => {
  this.input.value = '';
  this.setState({
    autoSuggest: this.autoSuggest()
  });
  this.ToggleClean();

}

ToggleClean = () =>{
  this.setState((prevState) => {
    return {
      showClean: this.input.value.length !== 0
    };
  });
}

onBlur = () => {
    this.setState({ focused: false })
}
onFocus = () => {
    this.setState({ focused: true })
}

addAutoSuggest = (value) => {
  this.input.value = value;
  this.input.focus();
  this.setState({
    autoSuggest: null
  });
  this.props.additem();
}

  render() {
    return (
      <div className="ListInputWrapper">
      <div className="listInput">
        <input
        autoFocus
        ref={(a) => this.input = a}
        onKeyUp={(e) => this.keyInput(e)}
        placeholder={this.state.focused ? '' : 'Input task'}
        onFocus={this.onFocus} onBlur={this.onBlur}
        className="listItemText">
        </input>
        <div className="listCleanUp">
          <div className={this.state.showClean ? '' : 'hidden'} onClick={() => this.clear()}>
          Clear
          </div>
          </div>
          <div className={this.state.autoSuggest ? 'autoSuggest' : 'hidden'} onClick={() => this.addAutoSuggest(this.state.autoSuggest)}>
          Did you mean {this.state.autoSuggest || ""}?
          </div>
        </div>
        </div>
    );
  }
};

export default ListInput;
