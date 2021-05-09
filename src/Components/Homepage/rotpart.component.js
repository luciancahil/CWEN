import React from 'react';

class Rotpart extends React.Component { 
    constructor(props) {
        super(props);
    }
    
    render() {
        return <div sliding = {this.props.sliding} className = "rotPart">
            {this.props.parts.heading}
        </div>
    }
}

export default Rotpart;