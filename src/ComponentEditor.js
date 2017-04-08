import React, { Component, PropTypes } from 'react';
import CodeMirror from 'react-codemirror';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { JsonEditor } from 'react-json-edit';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material.css';

class ComponentEdit extends Component {
  render() {
    const CMOptions = {
      mode: 'javascript',
      lineNumbers: true,
      theme: 'material'
    };

    return (
      <Tabs>
        <TabList>
          <Tab>Markup</Tab>
          <Tab>Style</Tab>
        </TabList>
        <TabPanel>
          <CodeMirror
            onChange={this.props.updateRender.bind(this)}
            options={CMOptions} />
        </TabPanel>
        <TabPanel>
          <JsonEditor
            value={this.props.style}
            propagateChanges={this.props.updateStyle.bind(this)}/>
        </TabPanel>
      </Tabs>
    );
  }
};

ComponentEdit.propTypes = {
  // render: PropTypes.object,
  // style: PropTypes.object,
  updateRender: PropTypes.func,
  updateStyle: PropTypes.func
};

export default ComponentEdit;
