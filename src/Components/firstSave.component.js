import React from 'react';

class FirstSaved extends React.Component { 
    constructor(props){
        super(props);
        if(localStorage.getItem("title") === null){
            window.location.href = "/404"
        }
    }

    render() {
        return <h2 className = "loggedInInfo">You have saved your post. To edit it further, go to the Writing Center</h2>
    }
}

export default FirstSaved;