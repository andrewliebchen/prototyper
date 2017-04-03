import React, { Component } from 'react';

import './Section.css';

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

export default Section;
