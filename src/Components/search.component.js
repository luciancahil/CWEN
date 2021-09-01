import React from 'react';
import SelfDisplay from './selfDisplay.component';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            blogInfo: [],
            searchTerm: ""
        }

        this.onChangeSearch = this.onChangeSearch.bind(this);
    }

    componentDidMount(){
        let URL =  "https://cwen-backend.herokuapp.com/searchBlogs?searchTerm="

        let query = this.props.location.search;


        let searchTerm;


        // getting the name and ID
        let searchIndex = query.indexOf("searchTerm=");
        searchTerm = query.substring(searchIndex + "searchTerm=".length);

        URL = URL + searchTerm;

        this.setState({
            searchTerm, searchTerm
        })

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
            <h2>Results for {this.state.searchTerm}:</h2>
            {this.state.blogInfo.map((blogStuff) => <SelfDisplay blogInfo = {blogStuff} key = {blogStuff}/>)}
        </div>
    }
}

export default Search;