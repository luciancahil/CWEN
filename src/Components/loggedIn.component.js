import React from 'react';

class LoggedIn extends React.Component { 
    render() {
        return <h3 className = "loggedInInfo">You have signed in as an {localStorage.getItem("title")}</h3>
    }
}

export default LoggedIn;