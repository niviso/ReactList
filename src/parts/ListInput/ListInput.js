import React, { Component } from 'react';
class ListInput extends Component{
  constructor(props) {
  super(props);
  this.value = null;
  this.state = {
    showClean : false,
    focused: false
   };

}
componentDidMount(){
    this.setInput();
}
keyInput = (e) => {
  this.props.keyinput(e);
  setTimeout(x=>{
    this.ToggleClean();
  },1)
}

setInput = () => {
  this.props.setinput(this.input);
}


clear = () => {
  this.input.value = '';
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

  render() {
    return (
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
        </div>
    );
  }
};

export default ListInput;
