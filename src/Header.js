import React, { Component, PropTypes } from 'react';
import { Flex, Box } from 'reflexbox';

import Button from './Button';

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
    // const { flows, handleRunFlow } = this.props;
    return (
      <Flex className="Header" justify="space-between" align="center">
        {/* <ol>
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
        </ol> */}
        <Box>
          <h1 className="Flow">
            1. When I click the button, show modal <a>✏️</a>
          </h1>
        </Box>
        <Box>
          <Button label="New flow"/>
          <Button label="👈"/>
          <Button label="👉"/>
        </Box>
      </Flex>
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
