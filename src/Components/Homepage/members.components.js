import React from 'react';
import Rotation from "./rotation.component"
import CocoPic from "./Members/Coco.jpg"
import FacePic from "./Members/Face.jpg"
import GrainPic from "./Members/Grain.jpg"
import ObuntuPic from "./Members/Obuntu.jpg"
import VuraPic from "./Members/Vura.jpg"



class Member extends React.Component { 
    constructor(props) {
        super(props);

        var parts = [];

        parts[0] = {
            image: CocoPic,
            heading : "",
            blub : "",
            link : "/"
        };

        parts[1] = {
            image: FacePic,
            heading : "",
            blub : "",
            link : "/"
        };

        parts[2] = {
            image: GrainPic,
            heading : "",
            blub : "",
            link : "/"
        };

        parts[3] = {
            image: ObuntuPic,
            heading : "",
            blub : "",
            link : "/"
        };

        parts[4] = {
            image: VuraPic,
            heading : "",
            blub : "",
            link : "/"
        };

        this.state = {
            rotationParts: parts,
        };
      }

    render() {
        return <Rotation type = "Members" parts = {this.state.rotationParts}/>;
    }
}

export default Member;