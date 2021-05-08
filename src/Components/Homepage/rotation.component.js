import React from 'react';

class Rotation extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            length: 2
        };
      }
    

    render() {
        return (
            <div id = "rotation">
                <div className = "test"></div>
                <div className = "test"></div>
                <div className = "test"></div>
                <div className = "test"></div>
                <div className = "test"></div>
                <div className = "test"></div>
                <div className = "test"></div>
                <div className = "test"></div>
                <div className = "test"></div>
                <div className = "test"></div>
                <div className = "test"></div>
            </div>
        );
    }
}

export default Rotation;