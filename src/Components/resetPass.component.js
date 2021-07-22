import React from 'react';

class ResetPass extends React.Component { 
        // this is the box for both loging in and signing up
        constructor(props){
            super(props);
            
            this.onSubmit = this.onSubmit.bind(this);
            this.onChangeFirstPass = this.onChangeFirstPass.bind(this);
            this.onChangeSecondPass = this.onChangeSecondPass.bind(this);
            this.state = {
                first_password: "" ,
                second_password: "",
            };
        }
    
        onChangeFirstPass(e){
            e.preventDefault();
    
            this.setState({
                first_password: e.target.value
            })
        }
    
        onChangeSecondPass(e){
            e.preventDefault();
    
            this.setState({
                second_password: e.target.value
            })
        }
    
        onSubmit(e){
            e.preventDefault();
            let userN = this.state.first_password;
            let passW = this.state.second_password;
            let fetchURL = "https://cwen-backend.herokuapp.com/login?username=" + userN + "&password=" + passW;
    
    
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
                        <div className = "BoxTop"><h2>Reset</h2></div>
    
                        <div className = "BoxBottom">
                            <div className = "BoxForms">
                                <plaintext>Password:</plaintext><input type = "password" value = {this.state.first_password} onChange = {this.onChangeFirstPass}></input><br></br>
                                <plaintext>Confirm Password:</plaintext><input type = "password" value = {this.state.second_password} onChange = {this.onChangeSecondPass}></input><br></br>
                                
                            </div>
                            <div id = "boxButtons">
                                <div className = "LoginButtonOuter">
                                    <div className = "LoginButtonInner">
                                        <button onClick = {this.onSubmit}>Sign in</button>
                                    </div>
                                </div>
                                <div className = "LoginButtonOuter">
                                    <div className = "LoginButtonInner">
                                        <a href = "/signup"><button>Sign up</button></a>
                                    </div>
                                </div>
                                <div className = "LoginButtonOuter">
                                    <div className = "LoginButtonInner">
                                        <a href = "/signup"><button>Reset</button></a>
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

export default ResetPass;