import React from 'react';

class StairRight extends React.Component { 
    render() {
        return (
            <div className = "StairRight">
                <div className = "SR-Pic">
                    <img src = {this.props.pic}/>
                </div>
                <div className = "SR-TextWrapper">
                    <div className = "SR-Text">
                        <h2>{this.props.Heading}</h2>
                        <p>{this.props.Blurb}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default StairRight;