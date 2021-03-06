import React from 'react';
import Rotation from './rotation.component';
import Headings from "./News/headings";
import Blurbs from "./News/blurbs";
import NetworkingPic from "./News/Networking.jpg";
import MappingPic from "./News/Mapping.jpg";
import CrisisPic from "./News/Crisis.jpg";
import ShelfPic from "./News/Shelf.jpg";


class News extends React.Component { 
    constructor(props) {
        super(props);

        var parts = [];

        parts[0] = {
            image: NetworkingPic,
            heading : Headings.Networking,
            blub : Blurbs.Networking,
            link : "/" + Headings.Networking
        };

        parts[1] = {
            image : MappingPic,
            heading : Headings.Mapping,
            blub : Blurbs.Mapping,
            link : "/" + Headings.Mapping
        };

        parts[2] = {
            image : CrisisPic,
            heading : Headings.Crisis,
            blub : Blurbs.Crisis,
            link : "/" + Headings.Crisis
        };

        parts[3] = {
            image : ShelfPic,
            heading : Headings.Shelf,
            blub : Blurbs.Shelf,
            link : "/" + Headings.Shelf
        };

        this.state = {
            rotationParts: parts,
        };
      }
    
    render() {
        return <Rotation type = "Blog" parts = {this.state.rotationParts}/>;
    }
}

export default News;