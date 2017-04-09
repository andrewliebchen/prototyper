import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Flex, Box } from 'reflexbox';
import Modal from 'react-modal';

import Section from './Section';
import ComponentForm from './ComponentForm';

import { modalStyles } from './config';

class ComponentInspector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newModal: false,
      editModal: false,
      selected: null,
    };
    this.toggleNewModal = this.toggleNewModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }

  toggleNewModal() {
    this.setState({newModal: !this.state.newModal});
  }

  toggleEditModal(selected) {
    this.setState({
      editModal: !this.state.editModal,
      selected: selected
    });
  }

  render() {
    const {
      components,
      submitNewComponent,
      updateComponent
    } = this.props;

    return (
      <span>
        <Section
          title="Components"
          addAction={this.toggleNewModal}>
          {components.map((component, i) => {
            return (
              <Flex
                className="Item"
                justify="space-between"
                key={i}>
                <Box>{component.name}</Box>
                <Box>
                  <a className="ItemAction"
                    onClick={this.toggleEditModal.bind(null, component.name)}
                    data-tip="Edit">
                    ✏️
                  </a>
                </Box>
              </Flex>
            );
          })}
        </Section>

        <Modal
          isOpen={this.state.newModal}
          onRequestClose={this.toggleNewModal}
          style={modalStyles}
          contentLabel="New Component">
          <h3>New component</h3>
          <ComponentForm
            handleSubmit={submitNewComponent}
            {...this.props}/>
        </Modal>

        <Modal
          isOpen={this.state.editModal}
          onRequestClose={this.toggleEditModal.bind(null, null)}
          style={modalStyles}
          contentLabel="Edit Component">
          <h3>Edit component</h3>
          <ComponentForm
            component={_.find(components, {name: this.state.selected})}
            handleSubmit={updateComponent}
            {...this.props}/>
        </Modal>
      </span>
    );
  }
}

ComponentInspector.propTypes = {
  components: PropTypes.array,
  submitNewComponent: PropTypes.func,
  updateComponent: PropTypes.func
};

export default ComponentInspector;
