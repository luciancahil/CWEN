import React from 'react';
import logo from './logo.png';

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <a href="/"> <img src = {logo}></img></a>
        <a id = "vline">|</a>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/featured">Featured</a>
        <a href="/contact">Contact</a>
        <a href="/blog">Blog</a>
      </nav>
    );
  }
}


export default Navbar;