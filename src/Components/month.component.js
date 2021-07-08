import React from 'react';
import Rotation from './Homepage/rotation.component';

class Month extends React.Component { 
    constructor(props) {
        super(props);
    
        this.state = {
          name: "",
          buisiness: "",
          pic: "",
          products: [],
          done: false
        };
    }

    componentDidMount(){
        // url to get entrepreur information
        let entrepreurURL = "https://cwen-backend.herokuapp.com/eOfMonth";

        // url to get product information
        let productURL = "https://cwen-backend.herokuapp.com/eOfMonthProduct?productNum=";

        // false if there are no more products
        let moreProducts = true;

        // product array we will place in state
        let fetchingProducts = [];


        // get information of the entreprenur herself
        fetch(entrepreurURL)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    name: data.name,
                    buisiness: data.company,
                    pic: data.picURL
                })
            })
            .catch(err => console.log(err));

        for(let i = 1; moreProducts; i++){
            let currentProductURL = productURL + i;
            fetch(currentProductURL)
                .then(response => response.text())
                .then(text =>{
                    if(text === "404" && moreProducts){
                        moreProducts = false;

                        if(this.state.products.length < fetchingProducts.length){
                            this.setState({
                                products: fetchingProducts,
                                done: true
                            });
                            console.log("once");
                        }
                    }else if(text !== "404"){
                        fetchingProducts[i - 1] = {
                            image: text,
                            heading : "",
                            blub : "",
                            link : "/"
                        }
                    }
                })
                .catch(err => console.log(err));

            if(i >= 100){
                break;
            }
        }
    }


    
    render() {
        console.log(this.state);
        console.log(this.state.done);

        if(this.state.done){
            return <Rotation type = "Products" parts = {this.state.products}/>
        }else
            return <h2>Month Page</h2>;
    }
}

export default Month;