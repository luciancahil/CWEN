import React from 'react';

class Invalid extends React.Component { 
    render() {
        return <h2 className = "loggedInInfo">Sorry! You are not authorized to view that page.</h2>
    }
}

export default Invalid;