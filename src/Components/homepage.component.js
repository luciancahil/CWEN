import React from 'react';
import Banner from "./Homepage/banner.component";
import Slogan from "./Homepage/slogan.component";
import Stairs from "./Homepage/stairs.component";
import News from "./Homepage/news.components";



class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slogan: "CWEN was built by women, for women.The buisness world was not."
    };
  }

  componentDidMount() {
    document.title = 'CWEN - Community Women Enterprise Network';
  }


  /*
  The banner is the Image to the right of the big text
  The slogan is the orange part that takes up the entire width of the page
  The Stair is the part that has a bunch of pictures beside a large title and a Blurb
  The rest is self-explanatory
  */
  render() {
    

    return (
      <div id = "Homepage">
        <Banner/>
        <Slogan inputString = {this.state.slogan}/>
        <Stairs/>
        <News/>
      </div>
    );
  }
}


export default HomePage;