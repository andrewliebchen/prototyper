import React, { Component, PropTypes } from 'react';

class Section extends Component {
  render() {
    return (
      <section className="Section InspectorSection">
        <h3>{this.props.title}</h3>
        {this.props.children}
      </section>
    );
  }
}

Section.propTypes = {
  title: PropTypes.string
};

export default Section;
