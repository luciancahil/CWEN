import React from 'react';
import Four04 from './404.component';

class Project extends React.Component { 

    constructor(props) {
        super(props);
    
        this.state = {
          slogan: "CWEN was built by women, for women.The buisness world was not."
        };
    }

    componentDidMount(){
        let query = this.props.location.search;
        let projectNameIndex = query.indexOf("projectName=");

        
    }

    render() {
        // the query of the url

        return <Four04/>;
    }
}

export default Project;