import React, { Component } from 'react';

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
          code: <button>Click me</button>,
          events: null
        }, {
          name: 'modal',
          code:
            <div style={{padding:'1em', border: '1px solid', display: 'inline-block'}}>
              Modal
            </div>,
          events: null
        }
      ],
      actions: [
        {
          name: 'Show modal'
        }
      ]
    };

    this.protoState = {
      modal: false
    }
  }

  render() {
    return (
      <div className="App">
        <Workspace
          protoState={this.protoState}
          {...this.state}/>
        <Inspector
          protoState={this.protoState}
          {...this.state}/>
      </div>
    );
  }
}

export default App;
