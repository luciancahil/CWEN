import React from 'react';
import Four04 from './404.component';

class Blog extends React.Component {
  componentDidMount() {
    document.title = 'CWEN Blog';
  }

  render() {
    return <Four04/>;
  }
}


export default Blog;