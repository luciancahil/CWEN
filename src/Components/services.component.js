import React from 'react';
import ServiceDesciptions from './serviceDesciptions';
import Four04 from './404.component';
import Image from './ServicePics/Networking And Events.jpg'

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
    let serviceType = this.state.serviceType
    let content = ServiceDesciptions[serviceType];
    let img = "";
    try{
    img = require("./ServicePics/" + serviceType + ".jpg").default
    }catch(e){
      return <Four04/> 
    }

    if(content === undefined){
      return <Four04/>
    }
    
    return (
      <div id = "services">
        <h2>{this.state.serviceType}</h2>
        <img src = {img} alt = {serviceType}/>
        <p>{ServiceDesciptions[serviceType]}</p>
      </div>
    );
  }
}


export default Services;