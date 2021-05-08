import React from 'react';
import Rotpart from "./rotpart.component"

class Rotation extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            length: 2
        };
      }
    

    render() {
        return (
            <div id = "rotation-wrapper">
                <div id = "rotation">
                    {this.props.parts.map(stuff => <Rotpart parts = {stuff}/>)}
                </div>
            </div>
        );
    }
}

export default Rotation;