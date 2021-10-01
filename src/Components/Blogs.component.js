import React from 'react';
import SelfDisplay from './selfDisplay.component';

class Blogs extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            blogInfo: [],
            searchField: ""
        }

        this.onChangeSearch = this.onChangeSearch.bind(this);
    }

    componentDidMount(){
        let URL =  "https://cwen-backend.herokuapp.com/recentBlogs"


        fetch(URL)
            .then((response) => response.json())
            .then((content) => this.setState({blogInfo: content}));
    }

    onChangeSearch(e){
        e.preventDefault();

        this.setState({
            searchField: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        window.location.href = "/search?searchTerm=" + this.state.searchField;
    }
    
    render() {
        return <div id = "blogs">
            <input type = "text" value = {this.state.searchField} onChange = {(e) => this.onChangeSearch(e)} placeholder = "search"/> <button onClick = {(e) => this.onSubmit(e)}>Search</button> <br/>
            {this.state.blogInfo.map((blogStuff) => <SelfDisplay public = {true} blogInfo = {blogStuff} key = {blogStuff}/>)}
        </div>
    }
}

export default Blogs;