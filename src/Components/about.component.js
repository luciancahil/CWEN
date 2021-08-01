import React from 'react';
import logo from "./logo.jpg"
import TeamMembers from './teamMembers.component';

class About extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      teamInfo: []
    }

  }

  componentDidMount() {
    document.title = 'CWEN - About us';

    
    // get teamInfo
    fetch("https://cwen-backend.herokuapp.com/get_members")
      .then((response) => response.json())
      .then(info => {
        this.setState({
          teamInfo: info
        })
      })
  }

  render() {
    return (
      <div id = "AboutUs">
        <img src = {logo}/>
        <h2>About Us</h2>
        <p>Community Women Enterprise Network Uganda Limited is a not for profit organization limited by guarantee. We are a  business resource for women entrepreneurs across all sectors. We provide business information, technical support and guidance  for our members to reach greater markets, create growing revenues and promote their businesses with more focus and clarity.</p>
        <p>Our aim is to reinforce the capacity of high potential low income entrepreneurs to become more productive, gain larger market shares in leading local and regional markets so they can promote and grow their businesses to sustainable economic empowerment.</p>
        <p>Become a member of our network and access professional support and advicee. Our carefully curated events are designed to support entrepreneurs with strong networks, partnerships, markets, social support and wellbeing. Click on the become a member link below to join us.</p>
        <a id = "signupButton" href = "/">BECOME A MEMBER</a>
        
        <TeamMembers information = {this.state.teamInfo}/>
      </div>
      // All images in OUR TEARM are 10:8 ratio, taller than wider
    )
  }
}


export default About;