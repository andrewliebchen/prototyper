import React, { Component, PropTypes } from 'react';
import CodeMirror from 'react-codemirror';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
          <CodeMirror
            onChange={this.props.updateStyle.bind(this)}
            options={CMOptions} />
        </TabPanel>
      </Tabs>
    );
  }
};

ComponentEdit.propTypes = {
  render: PropTypes.func,
  style: PropTypes.func,
  updateRender: PropTypes.func,
  updateStyle: PropTypes.func
};

export default ComponentEdit;
