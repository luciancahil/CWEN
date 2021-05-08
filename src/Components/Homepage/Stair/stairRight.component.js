import React from 'react';

class StairRight extends React.Component { 
    render() {
        return (
            <div ClassName = "StairLeft">
                <h2>{this.props.Heading}</h2>
                <p>{this.props.Blurb}</p>
                <img src = {this.props.pic}/>
            </div>
        );
    }
}

export default StairRight;