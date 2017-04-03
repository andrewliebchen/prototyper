import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Form, Text, Select } from 'react-form'

class NewAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      target: null,
      value: null
    }
  }

  render() {
    const componentList = []
    _.map(this.props.components, (component) => {
      componentList.push({
          label: component.name,
          value: component.slug
      });
    });

    return (
      <div className="NewAction">
        <h3>New action</h3>
        <Form
          onSubmit={(values) => {this.props.handleSubmit(values)}}>
          {({submitForm}) => {
            return (
              <form onSubmit={submitForm}>
                <label>Name</label>
                <Text field="name" />
                <label>Target</label>
                <Select
                  field="target"
                  options={componentList} />
                <label>Value</label>
                <Text field="value" />
                <button type='submit'>Create</button>
              </form>
            );
          }}
        </Form>
      </div>
    );
  }
}

NewAction.propTypes = {
  components: PropTypes.array,
  submitForm: PropTypes.func
};

export default NewAction;
