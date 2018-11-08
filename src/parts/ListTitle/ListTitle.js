import React, { Component } from 'react';
import './ListTitle.scss';
class ListTitle extends Component{
  constructor(props) {
  super(props);
  this.value = null;
  this.state = {
    showClean : false,
    focused: false,
    showEdit: false
   };

}
keyInput = (e) => {
  if(e.keyCode === 13){
    this.updatePropTitle();
    e.preventDefault();
  }
}

updatePropTitle = () => {
  this.props.updateTitle(this.input.value);
  this.setState({
    focused: false
  });
}


onBlur = () => {
    this.updatePropTitle();
    this.setState({ focused: false })
}
onFocus = () => {
    this.setState({ focused: true }, () => {
      this.input.value = this.props.title;
      this.input.focus();
    });
}

  render() {

    return (
      <div className="listTitleWrapper">
      <div onClick={this.onFocus} className={this.state.focused ? 'hidden' : ''}>
      <div className="listTitle">{this.props.title}</div>
      </div>
      <div className={this.state.focused ? 'fill-w' : 'hidden'}>
        <input
        ref={(a) => this.input = a}
        onKeyDown={(e) => this.keyInput(e)}
        placeholder="Name of your list"
        className="TitleInput"
        onBlur={this.onBlur}
        maxLength="40"
        />
        </div>
        </div>
    );
  }
};

export default ListTitle;
