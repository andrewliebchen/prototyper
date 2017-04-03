import React, { Component } from 'react';
import _ from 'lodash';

import NewComponent from './NewComponent';

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
  constructor(props) {
    super(props);
    this.state = {
      newComponent: false
    };
    this.handleNewComponent = this.handleNewComponent.bind(this);
  }

  handleNewComponent() {
    this.setState({newComponent: !this.state.newComponent});
  }

  render() {
    const {
      actions,
      components,
      prototype,
      handleActionPlay,
      handleNewComponentSubmit
    } = this.props;
    return (
      <div className="Inspector">
        <Section title="State">
          {_.map(prototype, (value, key) => {
            return <div key={key}>{key}: {_.toString(value)}</div>
          })}
        </Section>
        <Section title="Actions">
          {actions.map((action, i) => {
            return (
              <ul className="Action" key={i}>
                <li>Name: {action.name}</li>
                <li>Target: {action.target}</li>
                <li>Object: {_.toString(action.object)}</li>
                <li><a onClick={handleActionPlay.bind(null, action.name)}>Play</a></li>
              </ul>
            );
          })}
        </Section>
        <Section title="Components">
          {components.map((component, i) => {
            return <div key={i}>{component.name}</div>;
          })}
          <a onClick={this.handleNewComponent}>New component</a>
        </Section>

        {this.state.newComponent &&
          <NewComponent
            handleSubmit={handleNewComponentSubmit}
            {...this.props}/>
        }
      </div>
    );
  }
}

export default Inspector;
