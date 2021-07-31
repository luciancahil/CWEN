import React from 'react';

class Illegal extends React.Component { 
    render() {
        return <h2 className = "loggedInInfo">Sorry! You are not authorized to view that page.</h2>
    }
}

export default Illegal;