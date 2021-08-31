import React from 'react';
import Four04 from './404.component';

class Blog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      valid: false
    }
  }

  componentDidMount() {
    document.title = 'CWEN Blog';
    let query = this.props.location.search;
    let baseURL = "http://localhost:4000/"
    let id = ""
    let author = ""


    // getting the name and ID
    let authorIndex = query.indexOf("author=");
    let ampIndex = query.indexOf("&");
    let idIndex = query.indexOf("id=");

    if(authorIndex != -1 && ampIndex != -1 && idIndex != -1){
      this.setState({
        valid: true
      })
      id = query.substring(idIndex + "id=".length);
      author = query.substring(authorIndex + "author=".length, ampIndex);
      console.log("author: " + author);
      console.log("id: " + id);

      let contentURL = baseURL + ""
    }
  }

  render() {
    if(!this.state.valid){
      return <Four04/>;
    }else{
      return <h2>valid</h2>
    }
    
  }
}


export default Blog;