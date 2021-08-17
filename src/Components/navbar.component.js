import React from 'react';
import logo from './logo.jpg';

class Navbar extends React.Component {
  constructor(props){
    super(props);

    this.state ={
      width: window.innerWidth
    }

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  updateDimensions(){
    this.setState({
      width: window.innerWidth
    })
  }

  render() {

    if(this.state.width <= 590){
      return(
        <nav>
          <a href = "/"><img alt = "logo" src = {logo}/></a>
          <button>≡</button>
          <div id = "mobileLinks">
            <a href="/">Home</a> <br/>
            <a href="/join">Join</a> <br/>
            <a href="/about">About</a> <br/>
            <a href="/projects?projectName=Woman+Entrepreneur+of+the+Month">Featured</a> <br/>
            <a href="/contact">Contact</a> <br/>
            <a href="/blog">Blog</a>
          </div>
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
        <a href="/blog">Blog</a>
      </nav>
    );
  }
}


export default Navbar;