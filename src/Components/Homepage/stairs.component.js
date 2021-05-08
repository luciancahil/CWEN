import React from 'react';
import StairRight from "./Stair/stairRight.component";
import StairLeft from "./Stair/stairLeft.component";
//The Blurbs that apear beside the images and below the Titles
import Blurbs from "./Stair/Blurbs"
// The titles that apear besides the images and above the blurgs
import Headings from "./Stair/Headings"


class Stairs extends React.Component { 
    constructor(props) {
        super(props);
        console.log(Blurbs.Month);
        console.log(Headings.Month);
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