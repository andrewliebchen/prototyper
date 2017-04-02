import React, { Component } from 'react';
import _ from 'lodash';
import update from 'immutability-helper';

import Workspace from './Workspace';
import Inspector from './Inspector';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      prototype: {
        modal: false
      },
      components: [
        {
          name: 'button',
          code: (prototype) => {
            return (
              <button
                onClick={this.handleEvent.bind(null, 'Show modal')}
                disabled={prototype.modal}>
                Click me
              </button>
            );
          }
        }, {
          name: 'modal',
          code: (prototype) => {
            return (
              <div
                style={{
                  padding:'1em',
                  border: '1px solid',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  display: prototype.modal ? 'inline-block' : 'none'
                }}>
                <a onClick={this.handleEvent.bind(null, 'Hide modal')}>Modal</a>
              </div>
            );
          }
        }
      ],
      actions: [
        {
          name: 'Show modal',
          target: 'modal',
          object: true,
          exec: (self) => {
            let temp = update(self.state.prototype, {modal: {$set: true}});
            self.setState({prototype: temp});
          }
        }, {
          name: 'Hide modal',
          target: 'modal',
          object: false,
          exec: (self) => {
            let temp = update(self.state.prototype, {modal: {$set: false}});
            self.setState({prototype: temp});
          }
        }
      ]
    };
  }

  handleEvent = (actionName, event) => {
    const action = _.find(this.state.actions, { name: actionName });
    action.exec(this);
  }

  render() {
    return (
      <div className="App">
        <Workspace {...this.state}/>
        <Inspector handleActionPlay={this.handleEvent} {...this.state}/>
      </div>
    );
  }
}

export default App;
