import React from 'react';
import SelfDisplay from './selfDisplay.component';

class Blogs extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            blogInfo: [],
            searchField: ""
        }
    }

    componentDidMount(){
        let URL =  "https://cwen-backend.herokuapp.com/recentBlogs"


        fetch(URL)
            .then((response) => response.json())
            .then((content) => this.setState({blogInfo: content}));
    }
    
    render() {
        return <div id = "blogs">
            {this.state.blogInfo.map((blogStuff) => <SelfDisplay blogInfo = {blogStuff} key = {blogStuff}/>)}
        </div>
    }
}

export default Blogs;