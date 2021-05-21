import React from 'react';
import Banner from "./Homepage/banner.component";
import Slogan from "./Homepage/slogan.component";
import Stairs from "./Homepage/stairs.component";
import Members from "./Homepage/members.components";
import News from "./Homepage/news.components";
import Footer from "./Homepage/footer.component";



class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // what is currently shown in the slogan top part
      sloganTop: "",
      // the full index quote for the slogan top part
      sloganTopFull: "CWEN was built by women, for women.",
      // how many characters we are currently showing in the slogan top
      sloganTopIndex: 0,
      // what is currently shown in the slogan bottom part
      sloganBottom: "",
      // the full index quote for the slogan bottom part
      sloganBottomFull: "The buisness world was not.",
      // how many characters we are currently showing in the slogan bottom
      sloganBottomIndex: 0
    };

    this.animateSlogan = this.animateSlogan.bind(this);
  }

  componentDidMount() {
    document.title = 'CWEN - Community Women Enterprise Network';
  }


  animateSlogan(){
    let topLen = this.state.sloganTopFull.length;
    let botLen = this.state.sloganBottomFull.length;

    console.log(topLen);
    console.log(botLen);

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
        <Slogan top = {this.state.sloganTop} bottom = {this.state.sloganBottom}/>
        <Stairs/>
        <News/>
        <Members/>
        <Footer/>
      </div>
    );
  }
}


export default HomePage;