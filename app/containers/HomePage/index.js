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

const blinks = [
  {
    "username": "bettse",
    "displayname": "Eric",
    "iftttkey": "1661ebd420004adc"
  }
]

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props)
    this.state = {
      background: '#0ff',
      colors: ['#fff', '#000'],
      blinks: blinks
    };
  }

  handleChangeComplete = (color) => {
    console.log(color.hex);
    this.setState({ background: color.hex });
  };

  render() {
    const {blinks, background} = this.state;
    return (
      <div>
      <h1>Control team blink1s</h1>
      {blinks.map((blink, index) => (
        <div key={index} className={blink.username}>
          <h2>{blink.displayname}</h2>
          <BlockPicker color={ background } onChangeComplete={ this.handleChangeComplete } iftttkey={blink.iftttkey} />
        </div>
      ))}
      </div>
    )
  }
}

