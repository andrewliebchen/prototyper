import React, { Component } from 'react';
import _ from 'lodash';

import './Inspector.css';

class Section extends Component {
  render() {
    return (
      <section className="Section InspectorSection">
        <h3>{this.props.title}</h3>
        {this.props.children}
      </section>
    );
  }
}

class Inspector extends Component {
  render() {
    const { actions, components, prototype } = this.props;
    return (
      <div className="Inspector">
        <Section title="State">
          {_.map(prototype, (value, key) => {
            return <div key={key}>{key}: {_.toString(value)}</div>
          })}
        </Section>
        <Section title="Actions">
          {actions.map((action, i) => {
            return <div key={i}>{action.name}</div>
          })}
        </Section>
        <Section title="Components">
          {components.map((component, i) => {
            return <div key={i}>{component.name}</div>
          })}
        </Section>
      </div>
    );
  }
}

export default Inspector;
