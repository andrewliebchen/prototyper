import React, { Component } from 'react';
import _ from 'lodash';

import Workspace from './Workspace';
import Inspector from './Inspector';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state ={
      components: [
        {
          name: 'button',
          code:
            <button onClick={this.handleEvent.bind(null, 'Show modal')}>
              Click me
            </button>
        }, {
          name: 'modal',
          code:
            <div
              style={{
                padding:'1em',
                border: '1px solid',
                display: 'inline-block'
              }}>
              Modal
            </div>
        }
      ],
      actions: [
        {
          name: 'Show modal',
          exec: () => {console.log('hi');}
        }
      ],
      prototype: {
        modal: false
      }
    };
  }

  handleEvent = (actionName, event) => {
    const action = _.find(this.state.actions, { name: actionName });
    action.exec();
  }

  render() {
    return (
      <div className="App">
        <Workspace
          protoState={this.state.protoState}
          {...this.state}/>
        <Inspector
          protoState={this.state.protoState}
          {...this.state}/>
      </div>
    );
  }
}

export default App;
