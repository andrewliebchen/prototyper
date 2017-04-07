import React, { Component } from 'react';
import _ from 'lodash';
import update from 'immutability-helper';

import Workspace from './Workspace';
import Inspector from './Inspector';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    // Stub in most of this stuff, needs to go...
    this.state ={
      prototype: {
        modal: false
      },
      components: [
        {
          slug: 'button',
          name: 'Button',
          event: 'onClick',
          action: 'Show modal',
          style: (prototype) => { return false; },
          render: (prototype) => {
            return (
              <button
                disabled={prototype.modal}>
                Click me
              </button>
            );
          }
        }, {
          slug: 'modal',
          name: 'Modal',
          event: 'onClick',
          action: 'Hide modal',
          style: (prototype) => {
            return ({
              padding: '1em',
              border: '1px solid',
              position: 'absolute',
              top: '50%',
              left: '50%',
              display: prototype.modal ? 'inline-block' : 'none'
            });
          },
          render: (prototype) => {
            return (
              <div>
                Modal
              </div>
            );
          }
        }
      ],
      actions: [
        {
          name: 'Show modal',
          target: 'modal',
          value: true,
          exec: (self) => {
            let temp = update(self.state.prototype, {modal: {$set: true}});
            self.setState({prototype: temp});
          }
        }, {
          name: 'Hide modal',
          target: 'modal',
          value: false,
          exec: (self) => {
            let temp = update(self.state.prototype, {modal: {$set: false}});
            self.setState({prototype: temp});
          }
        }
      ],
      flows: [
        {
          event: 'click',
          component: 'button',
          action: 'Show modal'
        }, {
          event: 'click',
          component: 'modal',
          action: 'Hide modal'
        }
      ]
    };
  }

  handleEvent = (actionName, event) => {
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
        let temp = update(self.state.prototype, {[values.target]: {$set: valueBool}});
        self.setState({prototype: temp});
      }
    }]});
    this.setState({actions: temp});
  }

  handleNewComponent(values) {
    let temp = update(this.state.components, {$push: [{
      name: values.name,
      slug: _.camelCase(values.name),
      event: values.event,
      action: values.action,
      style: (prototype) => { return JSON.parse(values.style) }, // TODO: This could be better!
      render: (prototype) => {
        return <span dangerouslySetInnerHTML={{__html: values.render}}/>;
      }
    }]});
    this.setState({components: temp});
  }

  render() {
    return (
      <div className="App">
        <Workspace
          handleEvent={this.handleEvent}
          handleRunFlow={this.handleEvent}
          {...this.state}/>
        <Inspector
          handlePlayAction={this.handleEvent}
          handleNewComponentSubmit={this.handleNewComponent.bind(this)}
          handleNewActionSubmit={this.handleNewAction.bind(this)}
          {...this.state}/>
      </div>
    );
  }
}

export default App;
