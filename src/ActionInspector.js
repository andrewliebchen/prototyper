import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import { Flex, Box } from 'reflexbox';

import Section from './Section';
import NewAction from './NewAction';

import { modalStyles } from './config';

class ActionInspector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({modal: !this.state.modal});
  }

  render() {
    const {
      actions,
      playAction,
      submitNewAction
    } = this.props;

    return (
      <span>
        <Section
          title="Actions"
          addAction={this.toggleModal}>
          {actions.map((action, i) => {
            return (
              <Flex
                className="Item"
                justify="space-between"
                key={i}>
                <Box>{action.name}</Box>
                <Box>
                  <a
                    className="ItemAction"
                    data-tip="Edit">
                    ✏️
                  </a>
                  <a
                    className="ItemAction"
                    onClick={playAction.bind(null, action.name)}
                    data-tip="Run">
                    🏃
                  </a>
                </Box>
              </Flex>
            );
          })}
        </Section>

        <Modal
          isOpen={this.state.modal}
          onRequestClose={this.toggleModal}
          style={modalStyles}
          contentLabel="New Action">
          <NewAction
            handleSubmit={submitNewAction}
            {...this.props}/>
        </Modal>
      </span>
    );
  }
}

ActionInspector.propTypes = {
  actions: PropTypes.array,
  playAction: PropTypes.func,
  submitNewAction: PropTypes.func
};

export default ActionInspector;
