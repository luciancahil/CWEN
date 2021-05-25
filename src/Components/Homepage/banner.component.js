import React from 'react';
import banner from "./SquareBanner.jpg"
import bannerLong from "./Banner-Long.jpg"

class Banner extends React.Component { 
    render() {
        return (
            <div id = "Homepage_Banner">
                <div id = "Homepage_Banner_Text">
                    <h1>Empowering Women <br/>Entrepreneurs</h1>
                    <p>Build, grow, and scale your buisness with the CWEN community</p>
                    <a href = "/">BECOME A MEMBER</a>
                </div>
                <div id = "Homepage_Banner_Image">
                    <img id = "banner_square" src = {banner} alt = "A CWEN Bootcamp"/>
                    <img id = "banner_tall" src = {bannerLong} alt = "A CWEN Entrepreneur"/>
                </div>
            </div>
        
        );
    }
}

export default Banner;

