import React, { Component, PropTypes } from 'react';

class DemoComponent extends Component {
  render() {
    const { component, handleEvent } = this.props;
    return (
      <span
        className="DemoComponent"
        onClick={component.event === 'onClick' && handleEvent.bind(this, component.action)}>
        {component.render(this.props.prototype)}
      </span>
    );
  }
}

DemoComponent.propTypes = {
  component: PropTypes.object,
  handleEvent: PropTypes.func
};

export default DemoComponent;
