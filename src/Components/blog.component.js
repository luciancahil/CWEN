import React from 'react';
import Four04 from './404.component';

class Blog extends React.Component {
  componentDidMount() {
    document.title = 'CWEN Blog';
    let query = this.props.location.search;
    let baseURL = "http://localhost:4000/"
    let id = ""
    let author = ""


    // getting the name and ID
    let authorIndex = query.indexOf("author=");
    let ampIndex = query.indexOf("&");
    let idIndex = query.indexOf("id=")
    id = query.substring(idIndex + "id=".length);
    author = query.substring(authorIndex + "author=".length, ampIndex);
    console.log("author: " + author);
    console.log("id: " + id);

    let contentURL = baseURL + ""


    console.log(query);
  }

  render() {
    return <Four04/>;
  }
}


export default Blog;