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
          event: 'onClick',
          action: 'Show modal',
          render: (prototype) => {
            return (
              <button
                disabled={prototype.modal}>
                Click me
              </button>
            );
          }
        }, {
          name: 'modal',
          event: 'onClick',
          action: 'Hide modal',
          render: (prototype) => {
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

  handleNewComponent(values) {
    let temp = update(this.state.components, {$push: [{
      name: values.name,
      event: values.event,
      action: values.action,
      render: (prototype) => {
        return <span dangerouslySetInnerHTML={{__html: values.render}}/>;
      }
    }]});
    this.setState({components: temp});
  }

  render() {
    return (
      <div className="App">
        <Workspace handleEvent={this.handleEvent} {...this.state}/>
        <Inspector
          handleActionPlay={this.handleEvent}
          handleNewComponentSubmit={this.handleNewComponent.bind(this)}
          {...this.state}/>
      </div>
    );
  }
}

export default App;
