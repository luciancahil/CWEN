import React from 'react';
import StairRight from "./stairRight.component"

class StairLeft extends React.Component { 
    render() {
        let url = "/projects?projectName=" + this.props.Heading.replaceAll(" ", "+").replaceAll("!","");

        // when width too small
        if(window.innerWidth <= 1080){
            return <StairRight Heading = {this.props.Heading} Blurb = {this.props.Blurb} pic = {this.props.pic}/>
        }

        return (
            <div className = "StairLeft">
                <div className = "SL-TextWrapper">
                    <div className = "SL-Text">
                        <h2>{this.props.Heading}</h2>
                        <p>{this.props.Blurb}</p>
                        <a href= {url}>View Project</a>
                    </div>
                </div>
                <div className = "SL-Pic">
                    <img src = {this.props.pic} alt = {this.props.Heading}/>
                </div>
            </div>
        );
    }
}

export default StairLeft;