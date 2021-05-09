import React from 'react';
import Rotpart from "./rotpart.component"

class Rotation extends React.Component { 
    constructor(props) {
        super(props);

        /* Setting the state Index parts array */
        let buildingPartsIndex = [];

        // the 0th value should be the final index
        buildingPartsIndex[0] = this.props.parts.length - 1;

        for(let i = 1; i < 5; i++){
            buildingPartsIndex[i] = i - 1;
        }


        /* building the state parts array */
        let buildingStateParts = [];
        for(let i = 0; i < 5; i++){
            console.log(buildingPartsIndex[i])
            buildingStateParts[i] = this.props.parts[buildingPartsIndex[i]];
        }

        this.state = {
            length: this.props.parts.length,
            sliding: "N",
            partsIndex: buildingPartsIndex,
            parts: buildingStateParts
        };

        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
    }

    moveLeft(e) {
        e.preventDefault();
        this.setState({sliding: "L"})
    };

    moveRight(e) {
        e.preventDefault();
        this.setState({sliding: "R"})
    };
    

    render() {
        console.log(this.state.parts);
        
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

                        <div id = "rotatingWrapper">
                            <div id = "rotating">
                                {this.state.parts.map(stuff => <Rotpart key = {stuff.heading} parts = {stuff} sliding = {this.state.sliding}/>)}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Rotation;