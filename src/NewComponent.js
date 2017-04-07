import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Form, Text, Select } from 'react-form';
import CodeMirror from 'react-codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material.css';

class NewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: null,
      style: null
    }
  }

  updateRenderCode(newCode) {
    this.setState({render: newCode});
  }

  updateStyleCode(newCode) {
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

    const CMOptions = {
      mode: 'javascript',
      lineNumbers: true,
      theme: 'material'
    };

    return (
      <div className="NewComponent">
        <h3>New component</h3>
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
                <label>Render</label>
                <CodeMirror
                  onChange={this.updateRenderCode.bind(this)}
                  options={CMOptions} />
                <label>Style</label>
                <CodeMirror
                  onChange={this.updateStyleCode.bind(this)}
                  options={CMOptions} />
                <button type='submit'>Create</button>
              </form>
            );
          }}
        </Form>
      </div>
    );
  }
}

NewComponent.propTypes = {
  actions: PropTypes.array,
  submitForm: PropTypes.func
};

export default NewComponent;
