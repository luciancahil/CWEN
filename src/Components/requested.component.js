import React from 'react';

class Requested extends React.Component { 
    constructor(props){
        super(props);
    }

    render() {
        return <h2 className = "generic">An reset link has been sent to your email. Please note that this can take several minutes</h2>
    }
}

export default Requested;