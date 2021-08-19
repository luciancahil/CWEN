import React from 'react';
import Four04 from './404.component';
import Month from './month.component';

class Project extends React.Component { 

    constructor(props) {
        //TODO ADD WIDTH CHECK
        // IF BELOW A CERTAIN WIDTH, ONLY DISPLAY ONE ITEM
        super(props);
    
        this.state = {
          url: "start",
          text: "",
          projectName: "",
          width: window.innerWidth,
        };

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    updateDimensions(){
        this.setState({
          width: window.innerWidth
        })
    }

    componentDidMount(){
        let query = this.props.location.search;
        let projectNameIndex = query.indexOf("projectName=");
        let name = query.substring(projectNameIndex + "projectName=".length);
        let getURL = "https://cwen-backend.herokuapp.com/projectData?projectName=" + name;
        
        window.addEventListener('resize', this.updateDimensions);

        this.setState({
            projectName: name.replaceAll("+"," ").replaceAll("%27","'")
            
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
        // true if we are on the events project
        let isOnEvents = this.state.projectName === "CWEN Events";
        if(this.state.projectName === "Woman Entrepreneur of the Month"){
            return <Month/>
        }else if(this.state.url === "404"){
            return <Four04/>;
        }else if(this.state.url === "start"){
            return <p id = "loading">loading...</p>
        }else{
            return(
                <div className = "allProject">
                    
                    <div className = "projectWrapper">
                        <div className = "project">
                            <div className = "projectText">
                                <div className = "ProjectTextWrapper">
                                {isOnEvents ?
                                    (<h2>The Women Entrepreneurs' Social</h2>):
                                    (<h2>{this.state.projectName}</h2>)}
                                    <p>{this.state.text}</p>
                                </div>
                            </div>
                            {this.state.width <= 910 /*width check */?
                                    (<br/>):
                                    (null)}
                            <img src = {this.state.url} alt = {this.state.projectName}/>                 
                        </div>
                    </div>
                    {isOnEvents ? (
                        [this.state.width <= 910 /*width check */?(
                            <div id = "CWENMeets">
                                <div className = "projectText">
                                    <div className = "ProjectTextWrapper">
                                        <h2>#CWENMeets</h2>
                                        <p>Launched in May 2019, these are small intimate events hosted by women entrepreneurs at their business premises or homes. The goal is to drive sales, increase leads and most importantly partnership amongst the women entrepreneurs.</p>
                                    </div>
                                </div>
                                    <img src = "https://cwen-storage.s3.us-east-2.amazonaws.com/CWEN+Meets.jpg" alt = "#CWEN Meets"/>
                            </div>):
                            (
                                <div id = "CWENMeets">
                                    <img src = "https://cwen-storage.s3.us-east-2.amazonaws.com/CWEN+Meets.jpg" alt = "#CWEN Meets"/>
                                    <div className = "projectText">
                                        <div className = "ProjectTextWrapper">
                                            <h2>#CWENMeets</h2>
                                            <p>Launched in May 2019, these are small intimate events hosted by women entrepreneurs at their business premises or homes. The goal is to drive sales, increase leads and most importantly partnership amongst the women entrepreneurs.</p>
                                        </div>
                                    </div>
                                 </div> 
                            )]
                        
                    ): (
                        
                        <div id = "buttonwrap">
                            <br/>
                            <a id = "signupButton" href = "/join">BECOME A MEMBER</a>
                            
                        </div>
                    )}
                </div>
            )
        }
        
    }
}

export default Project;