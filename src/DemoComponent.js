import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Modal from 'react-modal';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate3d(-50%, -50%, 0)',
    width: '400px'
  }
}

class DemoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.state({modal: !this.state.modal});
  }

  render() {
    const { component, handleEvent } = this.props;
    return (
      <span>
        <span
          ref="parent"
          onClick={component.event === 'onClick' && handleEvent.bind(this, component.action)}
          dangerouslySetInnerHTML={{__html: component.render}}/>

        <Modal
          isOpen={this.state.modal}
          onRequestClose={this.toggleModal}
          style={modalStyles}
          contentLabel="Component">
          "hi"
        </Modal>
      </span>
    );
  }

  _renderStyle() {
    const { component, prototype } = this.props;
    const componentParent = ReactDOM.findDOMNode(this.refs.parent).firstChild;
    if (component.style) {
      _.map(component.style(prototype), (value, key) => {
        componentParent.style[key] = value;
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
