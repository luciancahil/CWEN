import React from 'react';
import StairRight from "./Stair/stairRight.component";
import StairLeft from "./Stair/stairLeft.component";


class Stairs extends React.Component { 
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