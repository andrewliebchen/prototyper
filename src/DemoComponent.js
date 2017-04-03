import React, { Component } from 'react';

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

export default DemoComponent;
