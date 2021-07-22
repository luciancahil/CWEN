import React from 'react';

class LoggedIn extends React.Component { 
    constructor(props){
        super(props);
        if(localStorage.getItem("title") === null){
            window.location.href = "/404"
        }
    }

    render() {
        return <h2 className = "loggedInInfo">You have signed in as an {localStorage.getItem("title")}</h2>
    }
}

export default LoggedIn;