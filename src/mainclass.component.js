import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from "./Components//navbar.component"
import HomePage from "./Components/homepage.component"
import About from "./Components/about.component"
import Services from "./Components/services.component"
import Featured from "./Components/featured.component"
import Contact from "./Components/contact.component"
import Blog from "./Components/blog.component"
import RichTextEditor from "./Components/RichTextEditor.component";


class MainClass extends React.Component{
    render(){
        return (
            <Router>
                <Navbar/>

                
                <Route path="/" exact render={(props) => <HomePage {...props}/>} />
                <Route path="/about" render={(props) => <About {...props}/>} />
                <Route path="/services" render={(props) => <Services {...props}/>} />
                <Route path="/featured" render={(props) => <Featured {...props}/>} />
                <Route path="/contact" render={(props) => <Contact {...props} />} />
                <Route path="/blog" render={(props) => <Blog {...props} />} />
                <Route path="/edit" render={(props) => <RichTextEditor {...props} />} />

            </Router>
        );
    }
}

export default MainClass