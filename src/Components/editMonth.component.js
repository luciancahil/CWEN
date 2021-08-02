import React from 'react';
import Invalid from './invalid.component';
import Rotation from "./Homepage/rotation.component"
import Month from './month.component';

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
              admin: isAdmin,
              picData: new FormData(),
              productData: new FormData(),
              onPreview: false
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
            this.onChangePic = this.onChangePic.bind(this);
            this.onChangeProducts = this.onChangeProducts.bind(this);
            this.updateMonth = this.updateMonth.bind(this);
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


            // getting product picture
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

    onChangePic(e){
        e.preventDefault();
        let data = new FormData();
        let file = e.target.files[0];

        data.append('pic', file, file.name)

        this.setState({
            pic: URL.createObjectURL(e.target.files[0]),
            picData: data
        })
    }

    onChangeProducts(e){
        e.preventDefault();
        let data = new FormData();
        //let file = e.target.files[0];
        
        let newProductsArray = [];

        for(let i = 0; i < e.target.files.length; i++){
            let file = e.target.files[i];
            newProductsArray[i] = {
                image: URL.createObjectURL(file),
                heading : "",
                blub : "",
                link : ""
            }
            data.append('products[]', file, file.name);
        }

        

        this.setState({
            products: newProductsArray,
            productData: data
        })
    }

    updateMonth(e){
        e.preventDefault();
        console.log("hi");
    }


    render() {
        
        // invalid
        if(!this.state.admin){
            return <Invalid/>
        }

        // previewing
        if(this.state.onPreview){
            return (
                <div id = "monthPreview">
                    <Month checkProps={true} name = {this.state.name} buisiness = {this.state.buisiness} pic = {this.state.pic} products = {this.state.products}/>
                    <br/>
                    <div id = "previewButton">
                        <button onClick={(e) => this.updateMonth(e)} id = "submit">Confirm Updates</button> <br/> <br/>
                        <button onClick={() => this.setState({onPreview: false})} id = "cancel">Cancel</button>
                    </div>
                </div>)
        }

        // editing
        return (
            <div id = "editMonth">
                <h3>Name</h3>
                <input type = "text" value = {this.state.name} onChange = {this.onChangeName}/>
                <h3>Company</h3>
                <input type = "text" value = {this.state.buisiness} onChange = {this.onChangeBuisness}/>
                <h3>Photo</h3>
                <img id = "portrait" src = {this.state.pic} alt = "portrait" /><br/><br/>
                <input  id = "monthPic" type = "file" onChange = {this.onChangePic}/>
                <h3>Products</h3>
                {(this.state.status === "products")?
                            (<div id = "monthProducts"><Rotation key={this.state.products[0].image} type = "Products" parts = {this.state.products}/> </div>):
                            (<div/>)}
                <input type = "file" multiple id = "monthProducts" onChange = {this.onChangeProducts}/> <br/>
                <br/>
                <button onClick={() => this.setState({onPreview: true})} id = "EditMonthSubmit">See Preview</button>
            </div>
        )
    }
}

export default EditMonth;