import React from 'react';

class Month extends React.Component { 
    constructor(props) {
        super(props);
    
        this.state = {
          name: "",
          buisiness: "",
          products: []
        };
    }

    componentDidMount(){
        // url to get entrepreur information
        let entrepreurURL = "https://cwen-backend.herokuapp.com/eOfMonth";
        console.log(entrepreurURL);


        // get information of the entreprenur herself
        fetch(entrepreurURL)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err));
    }


    
    render() {
        return <h2>Month Page</h2>;
    }
}

export default Month;