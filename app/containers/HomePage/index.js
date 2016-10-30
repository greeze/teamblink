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
const baseUrl = 'https://stacks.stackery.io/23628740815157/blink';
const blinksUrl = `${baseUrl}s`;
const updateBase = baseUrl;

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      background: '#0ff',
      colors: ['#fff', '#000'],
      blinks: [],
      selectedBlink: {},
    };
  }

  componentDidMount() {
    fetch(blinksUrl).then((response) => {
      return response.json().then((json) => {
        this.setState({ blinks: json, selectedBlink: json[0] });
      });
    });
  }

  handleBlinkSelect = (blink) => {
    this.setState({ selectedBlink: blink });
  }

  handleChangeComplete = (color) => {
    const { selectedBlink } = this.state;
    const { iftttkey } = selectedBlink;
    if (iftttkey) {
      fetch(`${updateBase}/${iftttkey}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: color.hex,
        }),
      });
    }
    this.setState({ background: color.hex });
  };

  render() {
    const { blinks, selectedBlink, background } = this.state;
    return (
      <div>
        <h1>Control team blink1s</h1>
        <select name="select">
          {blinks.map((blink, index) => (
            <option key={index} value={blink.username} onChange={this.handleBlinkSelect.bind(this, blink)}>{blink.displayname}</option>
          ))}
        </select>
        <h2>{selectedBlink.displayname}</h2>
        <BlockPicker color={background} onChangeComplete={this.handleChangeComplete} />
      </div>
    );
  }
}

