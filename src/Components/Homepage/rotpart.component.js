import React from 'react';

class Rotpart extends React.Component { 
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div sliding = {this.props.sliding} className = "rotPart">
                <a href = {this.props.parts.link}>
                    <img src = {this.props.parts.image}/>
                </a>
                <div className = "rot-text">
                    <h2>{this.props.parts.heading}</h2>
                    <p>{this.props.parts.blub}</p>
                </div>
            </div>
        )
    }
}

export default Rotpart;