import React from 'react';
import Rotpart from "./rotpart.component"

class Rotation extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            length: 2,
            sliding: 0
        };

        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
    }

    moveLeft(e) {
        e.preventDefault();
        alert("Move Left");
    };

    moveRight(e) {
        e.preventDefault();
        alert("Move Left");
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
                                    <a href="#" onClick={this.moveLeft}>&lt;</a>
                                    <a href="#" onClick={this.moveRight}>&gt;</a>
                                </div>
                            </div>
                        </div>

                        <div id = "rotating">
                            {this.props.parts.map(stuff => <Rotpart parts = {stuff} sliding = {this.state.sliding}/>)}
                        </div>
                    </div>
                </div>
        );
    }
}

export default Rotation;