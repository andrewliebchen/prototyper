import React, { Component, PropTypes } from 'react';

class Button extends Component {
  render() {
    return (
      <a className="Button" onClick={this.props.onClick}>
        {this.props.label}
      </a>
    )
  }
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
