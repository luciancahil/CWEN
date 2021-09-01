import React from 'react';
import SelfDisplay from "./selfDisplay.component"

class WritingCenter extends React.Component { 
    constructor(props){
        super(props)

        this.state = {
            blogInfo: []
        }
    }

    componentDidMount(){
        let URL =  "https://cwen-backend.herokuapp.com/allBlogs?token=" + encodeURI(localStorage.getItem("token")).replaceAll("+","%2B")

        console.log(URL);

        fetch(URL)
            .then((response) => response.json())
            .then((content) => this.setState({blogInfo: content}));
    }

    render() {
        return (
            <div id = "Blog Preview">
                {this.state.blogInfo.map((blogStuff) => <SelfDisplay blogInfo = {blogStuff} key = {blogStuff}/>)}
            </div>
        )
        
    }
}

export default WritingCenter;