import React from 'react';

class SignedOut extends React.Component { 

    constructor(props){
        super(props);
        localStorage.clear();
    }

    render() {
        return <h2 className = "loggedInInfo">You have signed out</h2>
    }
}

export default SignedOut;