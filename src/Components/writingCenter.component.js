import React from 'react';

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
        console.log(this.state.blogInfo);
        return <h2>WritingCenter Page</h2>;
    }
}

export default WritingCenter;