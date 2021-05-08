import React from 'react';

class StairLeft extends React.Component { 
    render() {
        return (
            <div className = "StairLeft">
                <div className = "SL-TextWrapper">
                    <div className = "SL-Text">
                        <h2>{this.props.Heading}</h2>
                        <p>{this.props.Blurb}</p>
                        <a href= "/">View Project</a>
                    </div>
                </div>
                <div className = "SL-Pic">
                    <img src = {this.props.pic}/>
                </div>
            </div>
        );
    }
}

export default StairLeft;