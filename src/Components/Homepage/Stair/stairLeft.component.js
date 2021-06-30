import React from 'react';

class StairLeft extends React.Component { 
    render() {
        let url = "/projects?projectName=" + this.props.Heading.replaceAll(" ", "+").replaceAll("!","");

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