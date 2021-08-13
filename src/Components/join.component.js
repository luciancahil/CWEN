import React from 'react';

class Join extends React.Component { 
    constructor(props){
        super(props);

        this.state = {
            Name: "",
            Phone: "",
            Email: "",
            Buisness: "",
            Description: "",
            Region: "",
            District: "",
            Town: "",
            ErrorMessage: []
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeBuisness = this.onChangeBuisness.bind(this);
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

    onChangeBuisness(e){
        e.preventDefault();

        this.setState({
            Buisness: e.target.value
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
        console.log(this.state.Name === "");
        let errors = [];
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
            console.log(this.state.ErrorMessage);
            return;
        }

    }

    render() {
        return (
            <div id = "joinPage">
                <h3>Name*</h3>
                <input type = "text" id = "Name" value={this.state.Name} onChange={this.onChangeName}/>
                <h3>Email*</h3>
                <input type = "text" id = "Email" value={this.state.Email} onChange={this.onChangeEmail}/>
                <h3>Phone Number</h3>
                <input type = "number" id="Phone" value={this.state.Phone} onChange={this.onChangePhone}/>
                <h3>Buisness Name</h3>
                <input type = "text" id = "Buisness" value={this.state.Buisness} onChange={this.onChangeBuisness}/>
                <h3>Tell us about your buissness!</h3>
                <input type = "text" id = "descrption" value={this.state.Description} onChange={this.onChangeDescription}/>
                <h3>Region</h3>
                <input type = "text" id = "Region" value={this.state.Region} onChange={this.onChangeRegion}/>
                <h3>District</h3>
                <input type = "text" id = "District" value={this.state.District} onChange={this.onChangeDistrict}/>
                <h3>Town</h3>
                <input type = "text" id = "Town" value={this.state.Town} onChange={this.onChangeTown}/>
                <br/> <br/> <br/>
                <button onClick = {this.onSubmit}>Join!</button>
                <div id = "errors">
                    {this.state.ErrorMessage.map((content) => <p>{content}</p>)}
                </div>
            </div>

        );
    }
}

export default Join;