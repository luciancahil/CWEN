import React from 'react';

class StairRight extends React.Component { 
    render() {
        // generates url
        let url = "/projects?projectName=" + this.props.Heading.replaceAll(" ", "+").replaceAll("!","");

        

        return (
            

            <div className = "StairRight">
                <div className = "SR-Pic">
                    <img src = {this.props.pic} alt = {this.props.Heading}/>
                </div>
                <div className = "SR-TextWrapper">
                    <div className = "SR-Text">
                        <h2>{this.props.Heading}</h2>
                        <p>{this.props.Blurb}</p>
                        <a href= {url}>View Project</a><br/>
                    </div>
                </div>
            </div>
        );
    }
}

export default StairRight;