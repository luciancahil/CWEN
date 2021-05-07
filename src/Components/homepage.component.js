import React from 'react';
import Banner from "./Homepage/banner.component";
import Slogan from "./Homepage/slogan.component";
import Stair from "./Homepage/stair.component";
import Members from "./Homepage/members.components";
import News from "./Homepage/news.components";
import Pitch from "./Homepage/pitch.component";



class HomePage extends React.Component {
  componentDidMount() {
    document.title = 'CWEN - Community Women Enterprise Network';
  }

  render() {
    return (
      <div id = "Homepage">
        <Banner/>
        <Slogan/>
        <Stair/>
        <Members/>
        <News/>
        <Pitch/>
      </div>
    );
  }
}


export default HomePage;