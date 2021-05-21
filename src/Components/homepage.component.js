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
      sloganBottomIndex: 0,
      slogan: "CWEN was built by women, for women.The buisness world was not."
    };

    this.sleep = this.sleep.bind(this);
    this.animateSlogan = this.animateSlogan.bind(this);
    this.updateSlogan = this.updateSlogan.bind(this);
    this.updateSloganState = this.updateSloganState.bind(this);

  }

  componentDidMount() {
    document.title = 'CWEN - Community Women Enterprise Network';
    this.animateSlogan();
  }


  animateSlogan(){
    let fullTop = this.state.sloganTopFull;
    let fullBot = this.state.sloganBottomFull;
  
    let topLen = fullTop.length;
    let botLen = fullBot.length;
    
    for(let i = 0; i < (topLen + botLen); i++){
      this.updateSlogan();
      //this.sleep(10);
    }

  }

  sleep(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
  }
  

  async updateSlogan(){
    let fullTop = this.state.sloganTopFull;
    let fullBot = this.state.sloganBottomFull;
  
    let topLen = fullTop.length;
    
    let topIndex = this.state.sloganTopIndex;
    let botIndex = this.state.sloganBottomIndex;

    if(topIndex < topLen - 1){
      topIndex++;

      this.setState({
        sloganTopIndex: topLen
      })
      
    }else{
      botIndex++;
      this.setState({
        sloganBottomIndex: botIndex
      })
    }

    await this.updateSloganState(fullTop,fullBot,topIndex,botIndex);
  }


  updateSloganState(fullTop,fullBot,topIndex,botIndex){
    return new Promise(resolve => {
      this.setState({
        sloganTop: fullTop.substr(0, topIndex),
        sloganBottom: fullBot.substr(0, botIndex)
      })
  });
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
        <Slogan top = {this.state.sloganTop} bottom = {this.state.sloganBottom} inputString = {this.state.slogan}/>
        <Stairs/>
        <News/>
        <Members/>
        <Footer/>
      </div>
    );
  }
}


export default HomePage;