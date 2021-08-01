import React from 'react';
import logo from './logo.jpg';

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <a href = "/"><img src = {logo}/></a>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/projects?projectName=Woman+Entrepreneur+of+the+Month">Featured</a>
        <a href="/contact">Contact</a>
        <a href="/blog">Blog</a>
      </nav>
    );
  }
}


export default Navbar;