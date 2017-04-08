import React, { Component, PropTypes } from 'react';

import './Header.css';

class Header extends Component {
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
    const { flows, handleRunFlow } = this.props;
    return (
      <header className="Header">
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
      </header>
    );
  }
};

Header.propTypes = {
  actions: PropTypes.array,
  components: PropTypes.array,
  flow: PropTypes.array,
  handleRunFlow: PropTypes.func
};

export default Header;
