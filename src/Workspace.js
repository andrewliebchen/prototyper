import React, { Component } from 'react';

import './Workspace.css';

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
              <span className="ComponentWrapper" key={i}>
                {component.code}
              </span>
            );
          })}
        </section>
      </div>
    );
  }
}

export default Workspace;
