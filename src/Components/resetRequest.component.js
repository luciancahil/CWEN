import React from 'react';

class ResetRequest extends React.Component { 
    /*A page to enter your email and request a new password */
    constructor(props){
        super(props);
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.state = {
            email: "" ,
            requestStatus: ""
        };
    }

    onChangeEmail(e){
        e.preventDefault();
        this.setState({
            email: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        let email = this.state.email;
        let fetchURL = "https://cwen-backend.herokuapp.com/reset_request?email=" + email;


        fetch(fetchURL)
            .then((response) => response.text())
            .then((text) => {
                console.log(fetchURL);
                console.log(text);

                if(text === "unfound"){
                    this.setState({
                        requestStatus: "There is no registered user with that email"
                    })
                }else if(text === "email error" || text === "err"){
                    this.setState({
                        requestStatus: "We are experiencing server issues. Please try again in a few minutes"
                    })
                }else if(text === "token and email"){
                    window.location.href = "/request_sent"
                }
            })
    }


    render() {
        return(
            <div className = "BoxBoxOuter">
                <div className = "Box">
                    <div className = "BoxTop"><h2>Login</h2></div>

                    <div className = "BoxBottom">
                        <div className = "BoxForms">
                            <plaintext>Email:</plaintext><input type = "text" value = {this.state.login_username} onChange = {this.onChangeEmail}></input><br></br>                            
                        </div>
                        <div id = "boxButtons">
                            <div className = "LoginButtonOuter" id = "ResetRequestButtons">
                                <div className = "LoginButtonInner">
                                    <button onClick = {this.onSubmit}>Get Reset Link</button>
                                </div>
                            </div>
                        </div>
                        <p id = "loginError">{this.state.requestStatus}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetRequest;