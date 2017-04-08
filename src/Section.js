import React, { Component, PropTypes } from 'react';
import { Flex, Box } from 'reflexbox';

class Section extends Component {
  render() {
    return (
      <section className="Section InspectorSection">
        <Flex justify="space-between">
          <Box>
            <h3>{this.props.title}</h3>
          </Box>
          {this.props.addAction &&
            <Box onClick={this.props.addAction}>
              <a>add</a>
            </Box>
          }
        </Flex>
        {this.props.children}
      </section>
    );
  }
}

Section.propTypes = {
  title: PropTypes.string,
  addAction: PropTypes.func
};

export default Section;
