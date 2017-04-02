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
          code: () => {
            return (
              <button onClick={this.handleEvent.bind(null, 'Show modal')}>
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
                  display: prototype.modal ? 'inline-block' : 'none'
                }}>
                Modal
              </div>
            );
          }
        }
      ],
      actions: [
        {
          name: 'Show modal',
          exec: (self) => {
            let temp = update(self.state.prototype, {modal: {$set: true}});
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
        <Inspector {...this.state}/>
      </div>
    );
  }
}

export default App;
