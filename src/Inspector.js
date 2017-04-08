import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Modal from 'react-modal';
import { Flex, Box } from 'reflexbox';
import JSONTree from 'react-json-tree';

import NewAction from './NewAction';
import ComponentForm from './ComponentForm';
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
          <JSONTree data={prototype} theme={'flat'}/>
        </Section>
        <Section title="Actions" addAction={this.toggleNewActionModal}>
          {actions.map((action, i) => {
            return (
              <Flex
                className="Item"
                justify="space-between"
                key={i}>
                <Box>{action.name}</Box>
                <Box
                  className="ItemAction"
                  onClick={handlePlayAction.bind(null, action.name)}>
                  🏃
                </Box>
              </Flex>
            );
          })}
        </Section>
        <Section
          title="Components"
          addAction={this.toggleNewComponentModal}>
          {components.map((component, i) => {
            return <div className="Item" key={i}>{component.name}</div>;
          })}
        </Section>

        <Modal
          isOpen={this.state.newComponentModal}
          onRequestClose={this.toggleNewComponentModal}
          style={modalStyles}
          contentLabel="New component">
          <h3>New component</h3>
          <ComponentForm
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
