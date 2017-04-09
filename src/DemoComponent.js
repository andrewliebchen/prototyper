import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

class DemoComponent extends Component {
  render() {
    const { component, handleEvent } = this.props;
    return (
      <span
        ref="parent"
        onClick={component.event === 'onClick' && handleEvent.bind(this, component.action)}
        dangerouslySetInnerHTML={{__html: component.render}}/>
    );
  }

  _renderStyle() {
    const { component, prototype } = this.props;
    const componentParent = ReactDOM.findDOMNode(this.refs.parent);

    if (component.style) {
      // eslint-disable-next-line
      const componentStyles = eval(`(prototype) => { return({${component.style}}); }`);

      _.map(componentStyles(prototype), (value, key) => {
        componentParent.firstChild.style[key] = value;
      });
    }
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
