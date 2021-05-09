import React from 'react';

class Rotpart extends React.Component { 
    constructor(props) {
        super(props);
    }
    
    render() {
        return <div sliding = {this.props.sliding} className = "rotPart"/>
    }
}

export default Rotpart;