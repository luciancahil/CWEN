import React from 'react';

class Month extends React.Component { 
    constructor(props) {
        super(props);
    
        this.state = {
          name: "start",
          buisiness: "",
          products: []
        };
    }

    componentDidMount(){

    }

    render() {
        return <h2>Month Page</h2>;
    }
}

export default Month;