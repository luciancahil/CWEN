import React from 'react';

class TeamMember extends React.Component { 
    constructor(props){
        super(props);
        // this.props.info contains an object containing all the information needed for this component 
        // info.memberName contains the name of the member
        // info.title contains the title
        // info.url contains the url of the profile picture
    }

    render() {
        console.log(this.props)
        return (
            
            <div className = "teamMember">
                <img  src = {this.props.info.url} alt = {this.props.info.memberName}/>
                <h2>{this.props.info.memberName}</h2>
                <h3>{this.props.info.title}</h3>
            </div>
        );
    }
}

export default TeamMember;