import React from 'react';
import ServiceDesciptions from './serviceDesciptions';
import Four04 from './404.component';

class Services extends React.Component {
  constructor(props){
    super(props);

    let query = this.props.location.search;
    let start = "type="
    let projectNameIndex = query.indexOf(start);
    let type = query.substring(projectNameIndex + start.length).replaceAll("+", " ");
    this.state = {
      serviceType: type
    }
  }

  componentDidMount() {
    document.title = 'CWEN - Services';
  }
  
  render() {
    let content = ServiceDesciptions[this.state.serviceType];
    console.log(this.state.serviceType)

    if(content === undefined){
      return <Four04/>
    }
    
    return (
      <div id = "services">
        <h2>{this.state.serviceType}</h2>
        <p>{ServiceDesciptions[this.state.serviceType]}</p>
      </div>
    );
  }
}


export default Services;