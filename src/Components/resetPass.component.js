import React from 'react';

class ResetPass extends React.Component { 
        // this is the box for both loging in and signing up
        constructor(props){
            super(props);

            let query = window.location.href;
            let start = "token="
            let urlToken = query.substring(query.indexOf(start) + start.length)
            
            this.onSubmit = this.onSubmit.bind(this);
            this.onChangeFirstPass = this.onChangeFirstPass.bind(this);
            this.onChangeSecondPass = this.onChangeSecondPass.bind(this);
            this.state = {
                first_password: "" ,
                second_password: "",
                token: urlToken,
                resetStatus: ""
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
            let passOne = this.state.first_password;
            let passTwo = this.state.second_password;

            if(passOne !== passTwo){
                this.setState({
                    resetStatus: "Error! Passwords do not match."
                })
                
            }else{
                let fetchURL = "https://cwen-backend.herokuapp.com/new_password?newPass=" + this.state.first_password + "&token=" + this.state.token
                fetch(fetchURL)
                    .then((response) => response.text())
                    .then((text) => {
                    console.log(text)
                        
                        if(text === "reject"){
                            this.setState({
                                resetStatus: "The provided token is invalid. Please request a new link using your email."
                            })
                            console.log(fetchURL);
                        }else{
                            alert("your password has changed");
                        }
                    })
            }
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
                            <p id = "loginError">{this.state.resetStatus}</p>
                        </div>
                    </div>
                </div>
            )
        }
}

export default ResetPass;