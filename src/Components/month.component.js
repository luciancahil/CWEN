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

        // url to get product information
        let productURL = "https://cwen-backend.herokuapp.com/eOfMonthProduct?productNum=";

        // int to count product
        let productNum = 1;


        // false if there are no more products
        let moreProducts = true;


        // get information of the entreprenur herself
        fetch(entrepreurURL)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err));

        for(let i = 1; moreProducts; i++){
            let currentProductURL = productURL + i;
            fetch(currentProductURL)
                .then(response => response.text())
                .then(text =>{
                    if(text === "404"){
                        moreProducts = false;
                    }else{
                        console.log(i + " " + text);
                    }
                })
                .catch(err => console.log(err));

            if(i === 5){
                break;
            }
        }
    }


    
    render() {
        return <h2>Month Page</h2>;
    }
}

export default Month;