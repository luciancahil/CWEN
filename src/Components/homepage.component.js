import React from 'react';

class HomePage extends React.Component {
  componentDidMount() {
    document.title = 'CWEN - Community Women Enterprise Network';
  }

  render() {
    return <h2>HomePage</h2>;
  }
}


export default HomePage;