import React from 'react';

class Blog extends React.Component {
  componentDidMount() {
    document.title = 'CWEN Blog';
  }

  render() {
    return <h2>Blog Page</h2>;
  }
}


export default Blog;