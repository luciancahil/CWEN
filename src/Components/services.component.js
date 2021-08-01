import React from 'react';
import ServiceDesciptions from './serviceDesciptions';

class Services extends React.Component {
  constructor(props){
    super(props);

    let query = this.props.location.search;
    let start = "type="
    let projectNameIndex = query.indexOf(start);
    let type = query.substring(projectNameIndex + start.length).replaceAll("+", " ");
    
  }

  componentDidMount() {
    document.title = 'CWEN - Services';
  }
  
  render() {
    return <h2>Services Page</h2>;
  }
}


export default Services;