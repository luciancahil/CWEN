import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Contact from "./Components/contact.component"
import Navbar from "./Components//navbar.component"
import HomePage from "./Components/homepage.component"


class MainClass extends React.Component{
    render(){
        return (
            <Router>
                <Navbar/>

                
                <Route path="/" exact render={(props) => <HomePage {...props}/>} />
                <Route path="/contact" render={(props) => <Contact {...props} />} />

            </Router>
        );
    }
}

export default MainClass