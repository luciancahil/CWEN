import React from 'react';

class Miscellaneous extends React.Component { 
    render() {
        return (
            <div id = "Miscellaneous">
                <a href = "/login?type=writer">Writer Login</a>
                <a href = "/login?type=admin">Admin Login</a>
                <a href = "/advertise_signup">Advertise With Us</a>
            </div>
        );

    }
}

export default Miscellaneous;