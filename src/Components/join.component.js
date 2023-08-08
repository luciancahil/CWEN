import React from 'react';
import Logo from './logo.jpg';

class Join extends React.Component { 
    constructor(props){
        document.title = 'CWEN - Join Us!';
        super(props);

        this.state = {
            Name: "",
            Phone: "",
            Email: "",
            business: "",
            Description: "",
            Region: "",
            District: "",
            Town: "",
            ErrorMessage: [],
            joined: false
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangebusiness = this.onChangebusiness.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeRegion = this.onChangeRegion.bind(this);
        this.onChangeDistrict = this.onChangeDistrict.bind(this);
        this.onChangeTown = this.onChangeTown.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(e){
        e.preventDefault();

        
    
        this.setState({
            Name: e.target.value
        })
        
    }

    onChangePhone(e){
        e.preventDefault();

        this.setState({
            Phone: e.target.value
        })
        
    }

    onChangeEmail(e){
        e.preventDefault();

        this.setState({
            Email: e.target.value
        })
        
    }

    onChangebusiness(e){
        e.preventDefault();

        this.setState({
            business: e.target.value
        })
        
    }
    
    onChangeDescription(e){
        e.preventDefault();

        this.setState({
            Description: e.target.value
        })
        
    }

    onChangeRegion(e){
        e.preventDefault();

        this.setState({
            Region: e.target.value
        })
        
    }

    onChangeDistrict(e){
        e.preventDefault();

        this.setState({
            District: e.target.value
        })
        
    }

    onChangeTown(e){
        e.preventDefault();

        this.setState({
            Town: e.target.value
        })
        
    }

    onSubmit(e){
        e.preventDefault();
        let valid = true;
        let errors = [];
        let URL = "https://cwen-backend.herokuapp.com/join?name=" + this.state.Name.replaceAll(" ", "+")
        + "&email=" + this.state.Email.replaceAll(" ", "+")
        + "&phoneNum=" + this.state.Phone.replaceAll(" ", "+")
        + "&business=" + this.state.business.replaceAll(" ", "+")
        + "&description=" + this.state.Description.replaceAll(" ", "+")
        + "&region=" + this.state.Region.replaceAll(" ", "+")
        + "&district=" + this.state.District.replaceAll(" ", "+")
        + "&town=" + this.state.Town.replaceAll(" ", "+")
        URL = encodeURI(URL);
        if(this.state.Name === ""){
            errors.push("Your name is required");
            valid = false;
        }

        if(this.state.Email === ""){
            errors.push("Your email is required");
            valid = false;
        }
        
        if(!valid){
            this.setState({
                ErrorMessage: errors
            });
            return;
        }


        fetch(URL)
            .then(response => response.text())
            .then((text) =>{
                if(text === "Succes!"){
                    this.setState({
                        joined: true
                    })
                }else if(text === "duplicate"){
                    errors[0] = "This email is already registered"
                    this.setState({
                        ErrorMessage: errors
                    });
                }
            })

    }

    render() {
        if(this.state.joined){
            return <h2 className = "generic">Congragulations {this.state.name}! Welcome to CWEN!</h2>
        }

        return (
            <div id = "joinPage">
                <div id = "joinDecoration">
                    <img src = {Logo}/>
                    <h3>Why join CWEN?</h3>
                    <p>Networking with CWEN will help you develop and improve your entrepreneurial skills, stay on top of your game in your business, keep an eye on the latest trends in the marketplace and gain access to the necessary resources that will foster your business career going forward. Join CWEN today!</p>
                </div>
                <div id = "joinInfo">
                    <div id = "joinTop">
                        <h3>Tell us about yourself!</h3>
                    </div>
                    <div id = "joinWrapper">
                        <h3>Name*</h3>
                        <input type = "text" id = "Name" value={this.state.Name} onChange={this.onChangeName}/>
                        <h3>Email*</h3>
                        <input type = "text" id = "Email" value={this.state.Email} onChange={this.onChangeEmail}/>
                        <h3>Phone Number</h3>
                        <input type = "number" id="Phone" value={this.state.Phone} onChange={this.onChangePhone}/>
                        <h3>Region</h3>
                        <input type = "text" id = "Region" value={this.state.Region} onChange={this.onChangeRegion}/>
                        <h3>District</h3>
                        <input type = "text" id = "District" value={this.state.District} onChange={this.onChangeDistrict}/>
                        <h3>Town</h3>
                        <input type = "text" id = "Town" value={this.state.Town} onChange={this.onChangeTown}/>
                        <h3>Business Name</h3>
                        <input type = "text" id = "business" value={this.state.business} onChange={this.onChangebusiness}/>
                        <h3>Tell us about your business!</h3>
                        <textarea rows="3" id = "descrption" value={this.state.Description} onChange={this.onChangeDescription}> </textarea>
                        <br/>
                        <div id = "submitLink">
                            <a onClick = {this.onSubmit}>Join!</a>
                        </div>
                    </div>
                    <div id = "errors">
                            {this.state.ErrorMessage.map((content, index) => <p key={index}>{content}</p>)}
                    </div>
                </div>
            </div>

        );
    }
}

export default Join;
