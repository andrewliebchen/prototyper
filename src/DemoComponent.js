import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

class DemoComponent extends Component {
  render() {
    const { component, prototype, handleEvent } = this.props;
    return (
      <span
        ref="parent"
        onClick={component.event === 'onClick' && handleEvent.bind(this, component.action)}>
        {component.render(prototype)}
      </span>
    );
  }

  _renderStyle() {
    const { component, prototype } = this.props;
    const componentParent = ReactDOM.findDOMNode(this.refs.parent).firstChild;
    _.map(component.style(prototype), (value, key) => {
      console.log(component.style);
      componentParent.style[key] = value;
    });
  }

  componentDidMount() {
    this._renderStyle()
  }

  componentDidUpdate() {
    this._renderStyle()
  }
}

DemoComponent.propTypes = {
  component: PropTypes.object,
  handleEvent: PropTypes.func
};

export default DemoComponent;
