import React from 'react';
import Banner from "./Homepage/banner.component";
import Stair from "./Homepage/stair.component";
import Pitch from "./Homepage/pitch.component";



class HomePage extends React.Component {
  componentDidMount() {
    document.title = 'CWEN - Community Women Enterprise Network';
  }

  render() {
    return (
      <div id = "homepage">
        <Banner/>
        <Stair/>
        <Pitch/>
      </div>
    );
  }
}


export default HomePage;