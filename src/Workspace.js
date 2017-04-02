import React, { Component } from 'react';

import './Workspace.css';

class DemoComponent extends Component {
  render() {
    return (
      <span className="ComponentWrapper">
        {this.props.component.code}
      </span>
    );
  }
}

class Workspace extends Component {
  render() {
    const { components } = this.props;
    return (
      <div className="Workspace">
        <section className="Section WorkspaceSection">

        </section>
        <section className="Section WorkspaceSection">
          {components.map((component, i) => {
            return (
              <DemoComponent
                key={i}
                component={component}/>
            );
          })}
        </section>
      </div>
    );
  }
}

export default Workspace;
