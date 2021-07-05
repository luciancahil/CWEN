import React from 'react';
import Four04 from './404.component';

class Project extends React.Component { 

    constructor(props) {
        super(props);
    
        this.state = {
          url: "start",
          text: "",
          projectName: ""
        };
    }

    componentDidMount(){
        let query = this.props.location.search;
        let projectNameIndex = query.indexOf("projectName=");
        let name = query.substring(projectNameIndex + "projectName=".length);
        let getURL = "https://cwen-backend.herokuapp.com/projectData?projectName=" + name;
        
        this.setState({
            projectName: name.replaceAll("+"," ").replaceAll("%27","'")
            
        })
        document.title = "CWEN Projects - " + name.replaceAll("+"," ");
        
        console.log(getURL);

        fetch(getURL)
            .then(response => {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                     return response.json().then(data => {
                    // process your JSON data further
                    this.setState({
                        url: data.url,
                        text: data.text
                    })
                });
                } else {
                return response.text().then(text => {
                    this.setState({
                        url:"404"
                    })
                });
                }
            })
            .catch(err => console.log(err))
        
    }

    render() {
        // true if we are on the events project
        let isOnEvents = this.state.projectName === "CWEN Events";
        console.log("url: " + this.state.projectName);
        if(this.state.url === "404"){
            return <Four04/>;
        }else if(this.state.url === "start"){
            return <p id = "loading">loading...</p>
        }else{
            return(
                <div className = "allProject">
                    
                    <div className = "projectWrapper">
                        <div className = "project">
                            
                            <img src = {this.state.url} alt = {this.state.projectName}/>
                            <div className = "projectText">
                                <div className = "ProjectTextWrapper">
                                    <h2>{this.state.projectName}</h2>
                                    <p>{this.state.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isOnEvents ? (
                        <img id = "CWENMeets" src = "https://cwen-storage.s3.us-east-2.amazonaws.com/CWEN+Meets.jpg" alt = "#CWEN Meets"/>
                    ): (
                        <div id = "buttonwrap">
                            <a id = "signupButton" href = "/">BECOME A MEMBER</a>
                        </div>
                    )}
                </div>
            )
        }
        
    }
}

export default Project;