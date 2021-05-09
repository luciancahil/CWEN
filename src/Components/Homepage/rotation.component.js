import React from 'react';
import Rotpart from "./rotpart.component"

class Rotation extends React.Component { 
    constructor(props) {
        super(props);

        this.lefRef= React.createRef();

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
            parts: buildingStateParts,
            isDisabled: "f"
        };

        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.doneAnimation = this.doneAnimation.bind(this);
        this.finishedMovingLeft = this.finishedMovingLeft.bind(this);
    }

    moveLeft(e) {
        e.preventDefault();
        //disable the buttons to prevent double clicking
        this.setState({
            isDisabled: "t"
        })


        this.setState({sliding: "L"})

        // onAnimationEnd does not work. This is the hack I came up wit
        setTimeout(this.doneAnimation,2000);
    };

    moveRight(e) {
        e.preventDefault();
        
        this.setState({sliding: "R"});

        // onAnimationEnd does not work. This is the hack I came up with
        setTimeout(this.doneAnimation,2000);
    };

    test(){
        alert("Done!")
    }

    doneAnimation(){
        if(this.state.sliding === "L"){
            this.finishedMovingLeft();
        }else if(this.state.sliding === "R"){
            alert("Done Moving Right");
        }
    }

    finishedMovingLeft(){
        

        /*updating the parts Index  array*/
        let updatingPartsIndex = this.state.partsIndex.slice();

        for(let i = 0; i < 4; i++){
            updatingPartsIndex[i] = updatingPartsIndex[i + 1];
        }

        if(updatingPartsIndex[4] === this.state.length - 1){
            updatingPartsIndex[4] = 0;
        }else{
            updatingPartsIndex[4] = updatingPartsIndex[4] + 1;
        }

        /* building the state parts array */
        let buildingStateParts = [];
        for(let i = 0; i < 5; i++){
            console.log(updatingPartsIndex[i])
            buildingStateParts[i] = this.props.parts[updatingPartsIndex[i]];
        }


        this.setState({
            sliding: "N",
            partsIndex: updatingPartsIndex,
            parts: buildingStateParts
        })

    }
    

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
                                    <a disabled={this.state.isDisabled === "t"} href="#" onClick={this.moveLeft}>&lt;</a>
                                    <a disabled={this.state.isDisabled === "t"} href="#" onClick={this.moveRight}>&gt;</a>
                                </div>
                            </div>
                        </div>

                        <div id = "rotatingWrapper">
                            <div id = "rotating">
                                {this.state.parts.map(stuff => <Rotpart onAnimationEnd = {this.doneAnimation} key = {stuff.heading} parts = {stuff} sliding = {this.state.sliding}/>)}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Rotation;