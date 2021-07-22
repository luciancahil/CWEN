import React from 'react';

class ChangedPassword extends React.Component { 
    constructor(props){
        super(props);
    }

    render() {
        return <h2 className = "generic">Your password has been changed.</h2>
    }
}

export default ChangedPassword;