import React from 'react';
import logo from './logo.jpg';

class Navbar extends React.Component {
  constructor(props){
    super(props);

    let isWriter = localStorage.getItem("title") === "author" || localStorage.getItem("title") === "admin"
    

    this.state ={
      width: window.innerWidth,
      showLinks: false,
      isWriterorAdmin: isWriter
    }

    this.updateDimensions = this.updateDimensions.bind(this);
    this.toggleLinks = this.toggleLinks.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  updateDimensions(){
    this.setState({
      width: window.innerWidth
    })
  }

  toggleLinks(){
    let links = this.state.showLinks;

    this.setState({
      showLinks: !links
    })
  }

  render() {
    if(this.state.width <= 590){
      return(
        <nav>
          <a href = "/"><img alt = "logo" src = {logo}/></a>
          <button onClick = {this.toggleLinks}>≡</button>
          {this.state.showLinks ? (
            <div id = "mobileLinks">
              <a href="/">Home</a> <br/>
              <a href="/join">Join</a> <br/>
              <a href="/about">About</a> <br/>
              <a href="/projects?projectName=Woman+Entrepreneur+of+the+Month">Featured</a> <br/>
              <a href="/contact">Contact</a> <br/>
              <a href="/blogs">Blog</a> <br/>
              <a href="https://cwen.nuixhexa.com/main/home" target="_blank">Shop</a> <br/>
              {this.state.isWriterorAdmin ? (<a href="/writing">Writing</a>) : (<div/>)}
            </div>
          ):(<div/>)}
          
        </nav>
      )
    }

    


    return (
      <nav>
        <a href = "/"><img alt = "logo" src = {logo}/></a>
        <a href="/">Home</a>
        <a href="/join">Join</a>
        <a href="/about">About</a>
        <a href="/projects?projectName=Woman+Entrepreneur+of+the+Month">Featured</a>
        <a href="/contact">Contact</a>
        <a href="/blogs">Blog</a>
        {this.state.isWriterorAdmin ? (<a href="/writing">Writing Center</a>) : (<div/>)}
      </nav>
    );
  }
}


export default Navbar;