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
      newActionModal: false,
      editComponentModal: false,
      selectedComponent: null
    };
    this.toggleNewComponentModal = this.toggleNewComponentModal.bind(this);
    this.toggleNewActionModal = this.toggleNewActionModal.bind(this);
    this.handleEditComponent = this.handleEditComponent.bind(this);
  }

  toggleNewComponentModal() {
    this.setState({newComponentModal: !this.state.newComponentModal});
  }

  toggleNewActionModal() {
    this.setState({newActionModal: !this.state.newActionModal});
  }

  handleEditComponent(name) {
    this.setState({
      editComponentModal: !this.state.editComponentModal,
      selectedComponent: name
    });
  }

  render() {
    const {
      actions,
      components,
      prototype,
      handlePlayAction,
      handleNewComponentSubmit,
      handleNewActionSubmit,
      handleComponentUpdate
    } = this.props;
    return (
      <div className="Inspector">
        <Section title="State">
          <JSONTree data={prototype} theme={'flat'}/>
        </Section>

        <Section
          title="Components"
          addAction={this.toggleNewComponentModal}>
          {components.map((component, i) => {
            return (
              <Flex
                className="Item"
                justify="space-between"
                key={i}>
                <Box>{component.name}</Box>
                <Box>
                  <a className="ItemAction"
                    onClick={this.handleEditComponent.bind(null, component.name)}
                    data-tip="Edit">
                    ✏️
                  </a>
                </Box>
              </Flex>
            );
          })}
        </Section>
        
        <Section title="Actions" addAction={this.toggleNewActionModal}>
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
                    onClick={handlePlayAction.bind(null, action.name)}
                    data-tip="Run">
                    🏃
                  </a>
                </Box>
              </Flex>
            );
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

        <Modal
          isOpen={this.state.editComponentModal}
          onRequestClose={this.handleEditComponent}
          style={modalStyles}
          contentLabel="Edit Component">
          <h3>Update component</h3>
          <ComponentForm
            component={_.find(components, {name: this.state.selectedComponent})}
            handleSubmit={handleComponentUpdate}
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
  handleNewActionSubmit: PropTypes.func,
  handleComponentUpdate: PropTypes.func
};

export default Inspector;
