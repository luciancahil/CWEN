import React from 'react';

class Miscellaneous extends React.Component { 
    render() {
        return (
            <div id = "Miscellaneous">
                {
                    (localStorage.getItem("title") === null) ?
                       ( <a href = "/login">Login</a>): (<a href = "/signout">Sign out</a>)
                }
                
                <a href = "/advertise_signup">Advertise With Us</a>
            </div>
        );

    }
}

export default Miscellaneous;