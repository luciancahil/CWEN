import React from 'react';
import Rotation from './Homepage/rotation.component';

class Month extends React.Component { 
    constructor(props) {
        super(props);
        let isAdmin = false;

        if(localStorage.getItem("title") === "admin"){
            isAdmin = true;
        }
        
    
        this.state = {
          name: "",
          buisiness: "",
          pic: "",
          products: [],
          status: "s",
          admin: isAdmin,
          blurb: ""
        };


        this.getFromAWS = this.getFromAWS.bind(this);
        this.getFromProps = this.getFromProps.bind(this);
        this.getFromAWSNew = this.getFromAWSNew.bind(this);
    }

    componentDidMount(){
        if(this.props.checkProps){
            this.getFromProps();
        }else{
            this.getFromAWS();
            this.getFromAWSNew();
        }
    }

    // tells component to use props to control information. Used for previewing edits.
    getFromProps(){
        this.setState({
            admin: false,
            name: this.props.name,
            buisiness: this.props.buisiness,
            pic: this.props.pic,
            products: this.props.products,
            status: "products"
        })
    }


    // used to get information from AWS. Default use
    getFromAWS(){
        // url to get entrepreur information
        let entrepreurURL = "https://cwen-backend.herokuapp.com/eOfMonth";

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
                });

                for(let q = 0; q < data.products.length; q++){
                    fetchingProducts[q] = {
                        image: data.products[q],
                        heading : "",
                        blub : "",
                        link : ""
                    }
                }
                this.setState({
                    products: fetchingProducts,
                    status: "products"
                });
                
            })
            .catch(err => console.log(err));
    }


    getFromAWSNew(){
        let infoURL = "https://cwen-backend.herokuapp.com/eOfMonthInfo";
        let blurbURL = "https://cwen-backend.herokuapp.com/eOfMonthBlurb";
        let productsURL = "https://cwen-backend.herokuapp.com/eOfMonthProducts";

        fetch(infoURL)
            .then(response => response.json())
            .then(data => console.log(data));

        fetch(blurbURL)
            .then(response => response.text())
            .then(data => console.log(data));

        fetch(productsURL)
            .then(response => response.json())
            .then(data => console.log(data));
    }


    
    render() {
        console.log(this.state.status);
        if(this.state.status === "none"){
            // still fetching information
            return <p id = "loading">loading...</p>
        }else{
            return (
                <div id = "EofMonth">
                    
                    <img id = "EofMonthFace" src = {this.state.pic} alt = {this.state.name}/>
                    

                    <div id = "EofMonthInfo">
                        <div id = "EofMonthText">
                            <h2>{this.state.name}</h2>
                            <h3><em>{this.state.buisiness}</em></h3>
                        </div>
                        <Rotation key = {this.state.products} type = "Products" parts = {this.state.products}/>
                    </div>
                    
                    <br/>
                    {  
                        (this.state.admin) ?
                            (<a href="/edit_month"><button>Edit page</button></a>) : (<div/>)
                    }
                </div>
                )
        }
            
    }
}

export default Month;