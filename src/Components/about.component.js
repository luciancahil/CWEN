import React from 'react';
import logo from "./logo.jpg"

class About extends React.Component {
  componentDidMount() {
    document.title = 'CWEN - About us';
  }

  render() {
    return (
      <div id = "homepage">
        <img src = {logo}/>
        <h2>About Us</h2>
        <p>Community Women Enterprise Network Uganda Limited is a not for profit organization limited by guarantee. We are a  business resource for women entrepreneurs across all sectors. We provide business information, technical support and guidance  for our members to reach greater markets, create growing revenues and promote their businesses with more focus and clarity.</p>
        <p>Our aim is to reinforce the capacity of high potential low income entrepreneurs to become more productive, gain larger market shares in leading local and regional markets so they can promote and grow their businesses to sustainable economic empowerment.</p>
        <p>Become a member of our network and access professional support and advicee. Our carefully curated events are designed to support entrepreneurs with strong networks, partnerships, markets, social support and wellbeing. Click on the become a member link below to join us.</p>
        <a id = "signupButton" href = "/">BECOME A MEMBER</a>
        <h2>OUR TEAM</h2>
      </div>
    )
  }
}


export default About;