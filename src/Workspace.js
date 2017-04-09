import React, { Component, PropTypes } from 'react';

import DemoComponent from './DemoComponent';

import './Workspace.css';

class Workspace extends Component {
  render() {
    const {
      components,
      prototype,
      playAction
     } = this.props;

    return (
      <div className="Workspace">
        <section className="Section WorkspaceSection">
          {components.map((component, i) => {
            return (
              <DemoComponent
                key={i}
                component={component}
                prototype={prototype}
                handleEvent={playAction}/>
            );
          })}
        </section>
      </div>
    );
  }
}

Workspace.propTypes = {
  actions: PropTypes.array,
  components: PropTypes.array,
  prototype: PropTypes.object,
  fireAction: PropTypes.func
};

export default Workspace;
