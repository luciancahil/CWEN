import React from 'react';
import Invalid from './invalid.component';

class EditMonth extends React.Component { 
    constructor(props){
        super(props);
            let isAdmin = false;
            let token = localStorage.getItem("token");
            let tokenCheckURL = encodeURI("https://cwen-backend.herokuapp.com/check_token?token=" + token)
            tokenCheckURL = tokenCheckURL.replaceAll("+","%2B")
    
            if(localStorage.getItem("title") === "admin"){
                isAdmin = true;
            }
            
        
            this.state = {
              name: "",
              buisiness: "",
              pic: "",
              products: [],
              status: "none",
              admin: isAdmin
            };

            fetch(tokenCheckURL)
                .then(response => response.json())
                .then(data =>{
                    if(data.title !== "admin"){
                        this.setState({
                            admin: false
                        })
                    }
            })
            
            this.onChangeName = this.onChangeName.bind(this);
            this.onChangeBuisness = this.onChangeBuisness.bind(this);
    }
    
    
    
    // we really need to finish this page. For now, assume nothing is done, since we have just done mostly backend stuff.
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
                    pic: data.picURL,
                    status: "info"
                })
            })
            .catch(err => console.log(err));


            // getting product information
        for(let i = 1; moreProducts; i++){
            let currentProductURL = productURL + i;
            fetch(currentProductURL)
                .then(response => response.text())
                .then(text =>{
                    if(text === "404" && moreProducts){
                        moreProducts = false;

                        // remove every undefined element
                        let filtered = fetchingProducts.filter(function(x) {
                            return x !== undefined;
                        });

                        
                        if(this.state.products.length < filtered.length){ // to make sure a smaller array doesn't come later

                            // We are done, and we are altering states for the complete array
                            this.setState({
                                products: filtered,
                                status: "products"
                            });
                        }
                    }else if(text !== "404"){ // there is a product with this number
                        fetchingProducts[i - 1] = {
                            image: text,
                            heading : "",
                            blub : "",
                            link : ""
                        }
                    }
                })
                .catch(err => console.log(err));

            if(i >= 100){
                break;
            }
        }
    }

    onChangeName(e){
        e.preventDefault();

        this.setState({
            name: e.target.value
        })
    }

    onChangeBuisness(e){
        e.preventDefault();

        this.setState({
            buisiness: e.target.value
        })
    }


    render() {
        if(!this.state.admin){
            return <Invalid/>
        }

        return (
            <div id = "editMonth">
                <h3>Name</h3>
                <input type = "text" value = {this.state.name} onChange = {this.onChangeName}/>
                <h3>Company</h3>
                <input type = "text" value = {this.state.buisiness} onChange = {this.onChangeBuisness}/>
                <h3>Photo</h3>
                <input type = "file"/>
                <h3>Products</h3>
                <input type = "file" multiple/> <br/>
                <br/>
                <button id = "EditMonthSubmit">See Preview</button>
            </div>
        )
    }
}

export default EditMonth;