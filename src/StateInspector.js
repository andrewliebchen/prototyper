import React, { Component, PropTypes } from 'react';
import { JsonTree } from 'react-editable-json-tree';

import Section from './Section';


class StateInspector extends Component {
  render() {
    const {prototype, updateState} = this.props;

    return (
      <Section title="State">
        <JsonTree
          data={prototype}
          rootName="state"
          onFullyUpdate={updateState.bind(null, prototype)}/>
      </Section>
    );
  }
}

StateInspector.propTypes = {
  prototype: PropTypes.object,
  updateState: PropTypes.func
};

export default StateInspector;
