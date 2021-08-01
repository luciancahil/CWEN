import React from 'react';
import TeamMember from './teamMember.component';

class TeamMembers extends React.Component { 
    constructor(props){
        super(props);

        // props.information contains the array of information about team members
    }


    render() {
        return (
            <div id = "teamMembers">
                <h2>OUR TEAM</h2>
                {this.props.information.map((info, index) => <TeamMember key = {info.memberName + "" + index} info = {info}/>)}
            </div>
        );
    }
}

export default TeamMembers;