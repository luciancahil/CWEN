import React from 'react';
import Four04 from './404.component';

class Project extends React.Component { 

    constructor(props) {
        super(props);
    
        this.state = {
          url: "404",
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
                    // this is text, do something with it
                });
                }
            })
            .catch(err => console.log(err))
        
    }

    render() {
        if(this.state.url === "404"){
            return <Four04/>;
        }else{
            return(
                <div className = "projectWrapper">
                    <div className = "project">
                        <h1>{this.state.projectName}</h1>
                        <img src = {this.state.url}/>
                        <p>{this.state.text}</p>
                    </div>
                </div>
            )
        }
        
    }
}

export default Project;