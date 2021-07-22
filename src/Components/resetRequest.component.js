import React from 'react';

class ResetRequest extends React.Component { 
    /*A page to enter your email and request a new password */
    constructor(props){
        super(props);
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.state = {
            email: "" ,
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
               // console.log(text)
                
                if(text === "unfound"){
                    this.setState({
                        login_status: "That username is not registered. Would you like to sign up?"
                    })
                }else if(text === "incorrect"){
                    this.setState({
                        login_status: "That password is incorrect. Would you like to reset your password?"
                    })
                }else if(text === "err"){
                    this.setState({
                        login_status: "Server Error! Please try again."
                    })
                }else{
                    // everything before this is the type, everything after this is the token
                    let cutoff = text.indexOf(",");

                    let title = text.substr(0,cutoff);
                    
                    let token = text.substr(cutoff + 1);

                    this.setState({
                        login_status: ""
                    })

                    localStorage.setItem("title", title);
                    localStorage.setItem("token", token);

                    window.location.href = "/logged_in"
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
                            <div className = "LoginButtonOuter">
                                <div className = "LoginButtonInner">
                                    <button onClick = {this.onSubmit}>Get Reset Link</button>
                                </div>
                            </div>
                        </div>
                        <p id = "loginError">{this.state.login_status}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetRequest;