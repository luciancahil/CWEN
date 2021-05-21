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
      sloganTop: "CWEN was built by women, for women. test",
      sloganBottom: "The buisness world was not. test"
    };

    this.animateSlogan = this.animateSlogan.bind(this);
  }

  componentDidMount() {
    document.title = 'CWEN - Community Women Enterprise Network';
  }


  animateSlogan(){
    const sloganTop = "CWEN was built by women, for women.";
    const sloganBottom = "The buisness world was not.";


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