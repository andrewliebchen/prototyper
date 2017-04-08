import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Form, Text, Select } from 'react-form';

import ComponentEditor from './ComponentEditor';

class ComponentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: this.props.render,
      style: this.props.style
    }
  }

  updateRender(newCode) {
    this.setState({render: newCode});
  }

  updateStyle(newCode) {
    this.setState({style: newCode})
  }

  render() {
    const actionsList = []
    _.map(this.props.actions, (action) => {
      actionsList.push({
          label: action.name,
          value: action.name
      });
    });

    return (
      <div className="ComponentForm">
        <Form
          onSubmit={(values) => {this.props.handleSubmit(
            values,
            this.state.render,
            this.state.style
          )}}
          defaultValues={{
            event: 'onClick',
            action: 'Show modal'
          }}>
          {({submitForm}) => {
            return (
              <form onSubmit={submitForm}>
                <label>Name</label>
                <Text field="name" />
                <label>Event</label>
                <Select
                  field="event"
                  options={[{
                    label: 'Click',
                    value: 'onClick'
                  }]} />
                <label>Action</label>
                <Select
                  field="action"
                  options={actionsList} />
                <ComponentEditor
                  updateRender={this.updateRender.bind(this)}
                  updateStyle={this.updateStyle.bind(this)}
                  render={this.state.render}
                  style={this.state.style}/>
                <button type="submit">Create</button>
              </form>
            );
          }}
        </Form>
      </div>
    );
  }
}

ComponentForm.propTypes = {
  actions: PropTypes.array,
  submitForm: PropTypes.func
};

export default ComponentForm;
