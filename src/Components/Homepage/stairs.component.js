import React from 'react';
import StairRight from "./Stair/stairRight.component";
import StairLeft from "./Stair/stairLeft.component";
//The Blurbs that apear beside the images and below the Titles
import Blurbs from "./Stair/Blurbs"
// The titles that apear besides the images and above the blurgs
import Headings from "./Stair/Headings"
//images
import ShelfPic from "./Stair/Shelf.PNG";
import AdvocacyPic from "./Stair/Advocacy.PNG";
import BootcampsPic from "./Stair/Bootcamps.PNG";
import EventsPic from "./Stair/Events.PNG";
import MonthPic from "./Stair/Month.PNG";


class Stairs extends React.Component { 
    constructor(props) {
        super(props);
    }
    
    
    render() {
        return (
            <div id = "HomeStairs">
                <StairRight Heading = {Headings.Shelf} Blurb = {Blurbs.Shelf} pic = {ShelfPic}/>
                <StairLeft Heading = {Headings.Advocacy} Blurb = {Blurbs.Advocacy} pic = {AdvocacyPic}/>
            </div>
            );
    }
}

export default Stairs;

//Passing Image as prop: https://stackoverflow.com/questions/52999377/react-passing-import-name-as-prop-and-adding-to-image-src