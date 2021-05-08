import React from 'react';

class Rotation extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            length: this.props.images.length
        };
      }
    

    render() {
        return <h2>Rotation Comp</h2>;
    }
}

export default Rotation;