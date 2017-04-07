import React, { Component, PropTypes } from 'react';

import DemoComponent from './DemoComponent';

import './Workspace.css';

class Workspace extends Component {
  renderActionSelector(defaultValue) {
    return (
      <select defaultValue={defaultValue}>
        {this.props.actions.map((action, i) => {
          return <option key={i} value={action.name}>{action.name}</option>;
        })}
      </select>
    );
  }

  renderComponentSelector(defaultValue) {
    return (
      <select defaultValue={defaultValue}>
        {this.props.components.map((component, i) => {
          return <option key={i} value={component.name}>{component.name}</option>;
        })}
      </select>
    );
  }

  renderEvents() {
    const events = ['click', 'hover'];
    return (
      <select defaultValue={'click'}>
        {events.map((event, i) => {
          return <option value={event} key={i}>{event}</option>
        })}
      </select>
    );
  }

  render() {
    const {
      components,
      flows,
      prototype,
      handleEvent,
      handleRunFlow
     } = this.props;
    return (
      <div className="Workspace">
        <section className="Section WorkspaceSection">
          <ol>
            {flows.map((flow, i) => {
              return (
                <li key={i}>
                  When I {this.renderEvents()}&nbsp;
                  {this.renderComponentSelector(flow.component)},&nbsp;
                  then {this.renderActionSelector(flow.action)}&nbsp;
                  <a onClick={handleRunFlow.bind(null, flow.action)}>Run</a>
                </li>
              );
            })}
          </ol>
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
  flows: PropTypes.array,
  actions: PropTypes.array,
  components: PropTypes.array,
  prototype: PropTypes.object,
  handleEvent: PropTypes.func,
  handleRunFlow: PropTypes.func
};

export default Workspace;
