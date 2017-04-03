import React, { Component } from 'react';
import _ from 'lodash';
import { Form, Text, Select, Textarea } from 'react-form'

class NewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      event: 'onClick',
      action: null,
      render: null
    }
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
      <div className="NewComponent">
        <h3>New component</h3>
        <Form
          onSubmit={(values) => {this.props.handleSubmit(values)}}
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
                <Textarea field="render" />
                <button type='submit'>Create</button>
              </form>
            );
          }}
        </Form>
      </div>
    );
  }
}

export default NewComponent;
