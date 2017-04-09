import React, { Component, PropTypes } from 'react';
import JSONTree from 'react-json-tree';

import Section from './Section';


class StateInspector extends Component {
  render() {
    return (
      <Section title="State">
        <JSONTree data={this.props.prototype} theme={'flat'}/>
      </Section>
    );
  }
}

StateInspector.propTypes = {
  prototype: PropTypes.object
};

export default StateInspector;
