import React, { Component } from 'react';
import _ from 'lodash';
import update from 'immutability-helper';
import ReactTooltip from 'react-tooltip';

import Header from './Header';
import Workspace from './Workspace';
import StateInspector from './StateInspector';
import ComponentInspector from './ComponentInspector';
import ActionInspector from './ActionInspector';

import { prototype, components, actions, flows } from './config';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prototype: prototype,
      components: components,
      actions: actions,
      flows: flows
    };
  }

  playAction = (actionName, event) => {
    const action = _.find(this.state.actions, { name: actionName });
    action.exec(this);
  }

  handleNewAction(values) {
    const valueBool = values.value === 'true' ? true : false
    let temp = update(this.state.actions, {$push: [{
      name: values.name,
      target: values.target,
      value: values.value,
      exec: (self) => {
        let temp = update(self.state.prototype, {
          [values.target]: {$set: valueBool}
        });
        self.setState({prototype: temp});
      }
    }]});
    let tempPrototype = update(this.state.prototype, {
      [values.target]: {$set: !valueBool}
    });

    this.setState({
      actions: temp,
      prototype: tempPrototype
    });
  }

  handleNewComponent(values, render, style) {
    let temp = update(this.state.components, {$push: [{
      name: values.name,
      slug: _.camelCase(values.name),
      event: values.event,
      action: values.action,
      style: style,
      render: render
    }]});

    this.setState({components: temp});
  }

  handleComponentUpdate(values, render, style) {
    let temp = update(this.state.components, {$merge: [{
      name: values.name,
      slug: _.camelCase(values.name),
      event: values.event,
      action: values.action,
      style: style,
      render: render
    }]});
    
    this.setState({components: temp});
  }

  render() {
    return (
      <div className="App">
        <Header
          handleRunFlow={this.playAction}
          {...this.state}/>

        <Workspace
          playAction={this.playAction}
          {...this.state}/>

        <div className="Inspector">
          <StateInspector prototype={this.state.prototype}/>
          <ComponentInspector
            submitNewComponent={this.handleNewComponent.bind(this)}
            updateComponent={this.handleComponentUpdate.bind(this)}
            {...this.state}/>
          <ActionInspector
            playAction={this.playAction}
            submitNewAction={this.handleNewAction.bind(this)}
            {...this.state}/>
        </div>

        <ReactTooltip />
      </div>
    );
  }
}

export default App;
