import React from 'react';

class Login extends React.Component { 
    // this is the box for both loging in and signing up
    constructor(props){
        super(props);
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {
            login_username: "" ,
            login_password: "",
            login_status: ""
        };
        if(sessionStorage.getItem(this.props.randomSession + "username") !== null){
            props.quickStart(sessionStorage.getItem(this.props.randomSession + "username"))
        }
    }

    onChangeUsername(e){
        e.preventDefault();

        this.setState({
            login_username: e.target.value
        })
    }

    onChangePassword(e){
        e.preventDefault();

        this.setState({
            login_password: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        let userN = this.state.login_username;
        let passW = this.state.login_password;
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
                            <plaintext>Username:</plaintext><input type = "text" value = {this.state.login_username} onChange = {this.onChangeUsername}></input><br></br>
                            <plaintext>Password:</plaintext><input type = "password" value = {this.state.login_password} onChange = {this.onChangePassword}></input><br></br>
                            
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

export default Login;