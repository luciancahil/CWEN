import React from 'react';
import StairRight from "./Stair/stairRight.component";
import StairLeft from "./Stair/stairLeft.component";
import Blurbs from "./Stair/Blurbs"


class Stairs extends React.Component { 
    constructor(props) {
        super(props);
        console.log(Blurbs.Month);
    }
    
    
    render() {
        return (
            <div id = "HomeStairs">
                <h1>Stairs</h1>
                <StairRight/>
                <StairLeft/>
                <StairRight/>
                <StairLeft/>
                <StairRight/>
            </div>
            );
    }
}

export default Stairs;

//Passing Image as prop: https://stackoverflow.com/questions/52999377/react-passing-import-name-as-prop-and-adding-to-image-src