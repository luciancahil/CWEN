import React from 'react';
import Rotpart from "./rotpart.component"

class Rotation extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            length: 2
        };
    }

    handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
      };
    

    render() {
        return (
                <div id = "rotation-wrapper">
                    <div id = "rotation">
                        <div id = "rot-head-wrapper">
                            <div id = "rot-head">
                                <div id = "rot-text">
                                    <h2>{this.props.type}</h2>
                                </div>
                                <div id = "rot-buttons">
                                    <a href="#" onClick={this.handleClick}>&lt;</a>
                                    <a href="#" onClick={this.handleClick}>&gt;</a>
                                </div>
                            </div>
                        </div>
                        <div id = "rotating">
                            {this.props.parts.map(stuff => <Rotpart parts = {stuff}/>)}
                        </div>
                    </div>
                </div>
        );
    }
}

export default Rotation;