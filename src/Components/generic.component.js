import React from 'react';

class Generic extends React.Component { 
    constructor(props){
        super(props);
        if(localStorage.getItem("title") === null){
            window.location.href = "/404"
        }
    }

    render() {
        return <h2 className = "generic">{localStorage.getItem("message")}</h2>
    }
}

export default Generic;