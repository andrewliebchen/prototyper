import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Modal from 'react-modal';

import NewAction from './NewAction';
import NewComponent from './NewComponent';
import Section from './Section';

import './Inspector.css';

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

class Inspector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComponentModal: false,
      newActionModal: false
    };
    this.toggleNewComponentModal = this.toggleNewComponentModal.bind(this);
    this.toggleNewActionModal = this.toggleNewActionModal.bind(this);
  }

  toggleNewComponentModal() {
    this.setState({newComponentModal: !this.state.newComponentModal});
  }

  toggleNewActionModal() {
    this.setState({newActionModal: !this.state.newActionModal});
  }

  render() {
    const {
      actions,
      components,
      prototype,
      handlePlayAction,
      handleNewComponentSubmit,
      handleNewActionSubmit
    } = this.props;
    return (
      <div className="Inspector">
        <Section title="State">
          {_.map(prototype, (value, key) => {
            return <div key={key}>{key}: {_.toString(value)}</div>
          })}
        </Section>
        <Section title="Actions">
          {actions.map((action, i) => {
            return (
              <ul className="Action" key={i}>
                <li>Name: {action.name}</li>
                <li>Target: {action.target}</li>
                <li>Value: {_.toString(action.value)}</li>
                <li><a onClick={handlePlayAction.bind(null, action.name)}>Play</a></li>
              </ul>
            );
          })}
          <a onClick={this.toggleNewActionModal}>New Action</a>
        </Section>
        <Section title="Components">
          {components.map((component, i) => {
            return <div key={i}>{component.name}</div>;
          })}
          <a onClick={this.toggleNewComponentModal}>New component</a>
        </Section>

        <Modal
          isOpen={this.state.newComponentModal}
          onRequestClose={this.toggleNewComponentModal}
          style={modalStyles}
          contentLabel="New component">
          <NewComponent
            handleSubmit={handleNewComponentSubmit}
            {...this.props}/>
        </Modal>

        <Modal
          isOpen={this.state.newActionModal}
          onRequestClose={this.toggleNewActionModal}
          style={modalStyles}
          contentLabel="New Action">
          <NewAction
            handleSubmit={handleNewActionSubmit}
            {...this.props}/>
        </Modal>
      </div>
    );
  }
}

Inspector.propTypes = {
  actions: PropTypes.array,
  components: PropTypes.array,
  prototype: PropTypes.object,
  handlePlayAction: PropTypes.func,
  handleNewComponentSubmit: PropTypes.func,
  handleNewActionSubmit: PropTypes.func
};

export default Inspector;
