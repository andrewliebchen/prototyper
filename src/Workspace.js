import React, { Component, PropTypes } from 'react';

import DemoComponent from './DemoComponent';

import './Workspace.css';

class Workspace extends Component {
  render() {
    const { components, prototype, handleEvent } = this.props;
    return (
      <div className="Workspace">
        <section className="Section WorkspaceSection">
          Stuff
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

Workspace.propTypes = {
  components: PropTypes.array,
  prototype: PropTypes.object,
  handleEvent: PropTypes.func
};

export default Workspace;
