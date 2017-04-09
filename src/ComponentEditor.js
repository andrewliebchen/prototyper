import React, { Component, PropTypes } from 'react';
import CodeMirror from 'react-codemirror';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material.css';

const defaultStyleValue = `(prototype) => {
  return ({

  });
}`;

class ComponentEdit extends Component {
  render() {
    const { updateRender, updateStyle, render, style } = this.props;

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
            value={render && render}
            onChange={updateRender.bind(this)}
            options={CMOptions} />
        </TabPanel>
        <TabPanel>
          <CodeMirror
            value={style ? style : defaultStyleValue}
            onChange={updateStyle.bind(this)}
            options={CMOptions} />
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
