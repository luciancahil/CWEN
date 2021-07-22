import React from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Switch, Route} from "react-router-dom";
import Navbar from "./Components//navbar.component";
import Footer from './Components/footer.component';
import HomePage from "./Components/homepage.component"
import About from "./Components/about.component"
import Services from "./Components/services.component"
import Featured from "./Components/featured.component"
import Contact from "./Components/contact.component"
import Blog from "./Components/blog.component"
import Login from "./Components/login.component"
import RichTextEditor from "./Components/RichTextEditor.component";
import Project from './Components/project.component';
import Four04 from './Components/404.component';
import LoggedIn from './Components/loggedIn.component';
import SignedOut from './Components/signedOut.component';
import ResetPass from './Components/resetPass.component';
import ResetRequest from './Components/resetRequest.component';



class MainClass extends React.Component{
    render(){
        return (
            <Router>
                <Navbar/>

                <Switch>
                    <Route path="/" exact render={(props) => <HomePage {...props}/>} />
                    <Route path="/about" render={(props) => <About {...props}/>} />
                    <Route path="/services" render={(props) => <Services {...props}/>} />
                    <Route path="/featured" render={(props) => <Featured {...props}/>} />
                    <Route path="/contact" render={(props) => <Contact {...props} />} />
                    <Route path="/blog" render={(props) => <Blog {...props} />} />
                    <Route path="/edit" render={(props) => <RichTextEditor {...props} />} />
                    <Route path="/login" render={(props) => <Login {...props} />} />
                    <Route path="/projects" render={(props) => <Project {...props} />} />
                    <Route path="/404" render ={(props) => <Four04 {...props} />} />
                    <Route path="/signout" render={(props) => <SignedOut {...props} />} />
                    <Route path="/logged_in" render ={(props) => <LoggedIn {...props} />} />
                    <Route path="/reset" render ={(props) => <ResetPass {...props} />} />
                    <Route path="/reset_request" render ={(props) => <ResetRequest {...props} />} />
                    <Redirect to="/404"/>
                </Switch>

                <Footer/>
            </Router>
        );
    }
}

export default MainClass