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

import Paper from 'material-ui/Paper';
import { Card, CardTitle, CardHeader } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { BlockPicker } from 'react-color';

const baseUrl = 'https://stacks.stackery.io/23628740815157/blink';
const blinksUrl = `${baseUrl}s`;
const updateBase = baseUrl;

const styles = {
  paper: {
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    minWidth: 210,
  },
  picker: {
    width: 170, // BlockPicker's default width
    margin: '0 auto',
  },
};

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      background: '#0ff',
      colors: ['#fff', '#000'],
      blinks: [],
      selectedUsername: '',
    };
  }

  componentDidMount() {
    fetch(blinksUrl).then((response) => {
      return response.json().then((json) => {
        this.setState({ blinks: json, selectedUsername: json[0].username });
      });
    });
  }

  handleBlinkSelect = (event, index, value) => {
    this.setState({ selectedUsername: value });
  }

  handleChangeComplete = (color) => {
    const { blinks, selectedUsername } = this.state;
    const selectedBlink = blinks.find((blink) => { return blink.username === selectedUsername; }) || {};
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
    const { blinks, selectedUsername, background } = this.state;
    const selectedBlink = blinks.find((blink) => { return blink.username === selectedUsername; });
    return (
      <Paper style={styles.paper} zDepth={1}>

      { blinks.length > 1 &&
        <SelectField autoWidth floatingLabelText="Person" value={this.state.selectedUsername} onChange={this.handleBlinkSelect}>
        {blinks.map((blink, index) => (
          <MenuItem key={index} value={blink.username} primaryText={blink.displayname} />
        ))}
        </SelectField>
      }

      { !selectedBlink && <Card><CardHeader title="Loading..." /></Card> }
      { selectedBlink &&
        <Card>
          <CardTitle title={selectedBlink.displayname} />
          <div style={styles.picker}>
            <BlockPicker color={background} onChangeComplete={this.handleChangeComplete} />
          </div>
        </Card>
      }

      </Paper>
    );
  }
}
