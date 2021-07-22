import React from 'react';

class Miscellaneous extends React.Component { 
    render() {
        return  <h3 className = "loggedInInfo">You have signed in as a {localStorage.getItem("title")}</h3>

    }
}

export default Miscellaneous;