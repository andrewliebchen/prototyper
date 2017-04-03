import React, { Component } from 'react';

import DemoComponent from './DemoComponent';

import './Workspace.css';

class Workspace extends Component {
  render() {
    const { components, prototype, handleEvent } = this.props;
    return (
      <div className="Workspace">
        <section className="Section WorkspaceSection">

        </section>
        <section className="Section WorkspaceSection">
          {components.map((component, i) => {
            return (
              <DemoComponent
                key={i}
                component={component}
                prototype={prototype}
                handleEvent={handleEvent}/>
            );
          })}
        </section>
      </div>
    );
  }
}

export default Workspace;
