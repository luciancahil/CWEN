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
            signup_status: "Hello"
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
        let fetchURL = "http://diff.wwtbe.nl/login?username=" + userN + "&password=" + passW;


        fetch(fetchURL)
            .then((response) => response.text())
            .then((text) => {
               // console.log(text)
                this.setState({
                    login_status: text
                })
                if(this.state.login_status == "Granted"){
                    this.props.chageUser(userN, passW);
                    window.history.pushState('page2', 'Title', '/home');
                    
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
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;