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
import { Card, CardTitle } from 'material-ui/Card';
import { BlockPicker } from 'react-color';

import styles from './styles.css';

const baseUrl = 'https://stacks.stackery.io/23628740815157/blink';
const blinksUrl = `${baseUrl}s`;
const updateBase = baseUrl;

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    defaultColor: React.PropTypes.string,
  };

  static defaultProps = {
    defaultColor: '#000',
  };

  constructor(props) {
    super(props);
    this.state = {
      blinks: [],
    };
  }

  componentDidMount() {
    fetch(blinksUrl).then((response) => {
      return response.json().then((json) => {
        this.setState({ blinks: json, selectedUsername: json[0].username });
      });
    });
  }

  handleChangeComplete = (color, blinkIndex) => {
    const { blinks } = this.state;
    const blink = blinks[blinkIndex];
    blink.hex = color.hex;
    const { iftttkey } = blink;
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
  };

  render() {
    const { defaultColor } = this.props;
    const { blinks } = this.state;
    return (
      <Paper className={styles.paper} zDepth={1}>
        {blinks.map((blink, index) => (
          <Card className={styles.card} key={index}>
            <CardTitle title={blink.displayname} />
            <div className={styles.picker}>
              <BlockPicker className={styles.blockpicker} color={blink.hex || defaultColor} onChangeComplete={(color) => { this.handleChangeComplete(color, index); }} />
            </div>
          </Card>
        ))}
      </Paper>
    );
  }
}
