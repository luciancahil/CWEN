import React from 'react';
import banner from "./SquareBanner.PNG"

class Banner extends React.Component { 
    render() {
        return (
            <div id = "Homepage_Banner">
                <div id = "Homepage_Banner_Text">
                    <h1>Quotes</h1>
                </div>
                <div id = "Homepage_Banner_Image">
                    <img src = {banner}/>
                </div>
            </div>
        
        );
    }
}

export default Banner;