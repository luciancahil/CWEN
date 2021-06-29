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
            projectName: name.replaceAll("+"," ")
        })
        document.title = "CWEN Projects - " + name.replaceAll("+"," ");

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
        if(this.state.url === "404"){
            return <Four04/>;
        }else if(this.state.url === "start"){
            return <p id = "loading">loading...</p>
        }else{
            return(
                <div className = "allProject">
                    
                    <div className = "projectWrapper">
                        <div className = "project">
                            
                            <img src = {this.state.url}/>
                            <div className = "projectText">
                                <div className = "ProjectTextWrapper">
                                    <h2>{this.state.projectName}</h2>
                                    <p>{this.state.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id = "buttonwrap">
                        <a id = "signupButton" href = "/">BECOME A MEMBER</a>
                    </div>

                </div>
            )
        }
        
    }
}

export default Project;