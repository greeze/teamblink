/*
* HomePage
*
* This is the first thing users see of our App, at the '/' route
*
* NOTE: while this component should technically be a stateless functional
* component (SFC), hot reloading does not currently support SFCs. If hot
* reloading is not a necessity for you then you can refactor it and remove
* the linting exception.
*/


import React from 'react';
import { BlockPicker } from 'react-color';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    background: '#0ff',
    colors: ['#fff', '#000'],
  };

  handleChangeComplete = (color) => {
    console.log(color.hex);
    this.setState({ background: color.hex });
  };
  render() {
    return <BlockPicker color={ this.state.background } onChangeComplete={ this.handleChangeComplete } />;
  }
}

