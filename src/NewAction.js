import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Form, Text, Select } from 'react-form'

class NewAction extends Component {
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
                <Select
                  field="value"
                  options={[{
                    label: 'true',
                    value: true
                  }, {
                    label: 'false',
                    value: false
                  }]}/>
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
