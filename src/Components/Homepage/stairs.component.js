import React from 'react';
import StairRight from "./Stair/stairRight.component";
import StairLeft from "./Stair/stairLeft.component";
//The Blurbs that apear beside the images and below the Titles
import Blurbs from "./Stair/Blurbs"
// The titles that apear besides the images and above the blurgs
import Headings from "./Stair/Headings"
//images
import ShelfPic from "./Stair/Shelf.jpg";
import AdvocacyPic from "./Stair/Advocacy.jpg";
import BootcampsPic from "./Stair/Bootcamps.jpg";
import EventsPic from "./Stair/Events.jpg";
import MonthPic from "./Stair/Month.jpg";


class Stairs extends React.Component {   
    render() {
        return (
            <div id = "HomeStairs">
                <StairRight Heading = {Headings.Shelf} Blurb = {Blurbs.Shelf} pic = {ShelfPic}/>
                <StairLeft Heading = {Headings.Advocacy} Blurb = {Blurbs.Advocacy} pic = {AdvocacyPic}/>
                <StairRight Heading = {Headings.Bootcamps} Blurb = {Blurbs.Bootcamps} pic = {BootcampsPic}/>
                <StairLeft Heading = {Headings.Events} Blurb = {Blurbs.Events} pic = {EventsPic}/>
                <StairRight Heading = {Headings.Month} Blurb = {Blurbs.Month} pic = {MonthPic}/>
            </div>
            );
    }
}

export default Stairs;

//Passing Image as prop: https://stackoverflow.com/questions/52999377/react-passing-import-name-as-prop-and-adding-to-image-src