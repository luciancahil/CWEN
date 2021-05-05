import React from 'react';

class About extends React.Component {
  componentDidMount() {
    document.title = 'CWEN - About us';
  }

  render() {
    return <h2>About Page</h2>;
  }
}


export default About;