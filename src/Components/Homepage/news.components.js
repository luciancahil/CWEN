import React from 'react';
import Rotation from './rotation.component';
import Headings from "./News/headings";
import Blurbs from "./News/blurbs";
import NetworkingPic from "./News/Networking.PNG";
import MappingPic from "./News/Mapping.PNG";
import CrisisPic from "./News/Crisis.PNG";
import ShelfPic from "./News/Shelf.PNG";
import WaluigiPic from "./News/Waluigi.jpg";
import DutchmanPic from "./News/Dutchman.png";


class News extends React.Component { 

    
    constructor(props) {
        super(props);

        var parts = [];

        parts[1] = {
            image: NetworkingPic,
            heading : Headings.Networking,
            blub : Blurbs.Networking,
            link : "/" + Headings.Networking
        };

        parts[2] = {
            image : MappingPic,
            heading : Headings.Mapping,
            blub : Blurbs.Mapping,
            link : "/" + Headings.Mapping
        };

        parts[3] = {
            image : CrisisPic,
            heading : Headings.Crisis,
            blub : Blurbs.Crisis,
            link : "/" + Headings.Crisis
        };

        parts[4] = {
            image : ShelfPic,
            heading : Headings.Shelf,
            blub : Blurbs.Shelf,
            link : "/" + Headings.Shelf
        };

        parts[5] = {
            image : WaluigiPic,
            heading : Headings.Waluigi,
            blub : Blurbs.Waluigi,
            link : "/" + Headings.Waluigi
        };

        parts[6] = {
            image : DutchmanPic,
            heading : Headings.Dutchman,
            blub : Blurbs.Dutchman,
            link : "/" + Headings.Dutchman
        };

        this.state = {
            rotationParts: parts,
        };
      }
    
    componentDidMount(){
    }
    
    render() {
        return <Rotation type = "News" parts = {this.state.rotationParts}/>;
    }
}

export default News;