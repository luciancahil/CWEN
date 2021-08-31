import React from 'react';
import Four04 from './404.component';

class Blog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: "loading",
      valid: false,
      contentState: null,
      mainBlogPhoto: "",
      blogPhotos: null,
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
      console.log("hi");
      this.setState({
        valid: true,
      })
      id = query.substring(idIndex + "id=".length);
      author = query.substring(authorIndex + "author=".length, ampIndex);
      console.log("author: " + author);
      console.log("id: " + id);

      let contentURL = baseURL + "getBlogContent?author=" + author + "&id=" + id;
      let mainPhtoURL= baseURL + "getBlogMainPhoto?author=" + author + "&id=" + id;
      let photosURL = baseURL + "getBlogPhotos?author=" + author + "&id=" + id;

      console.log(contentURL);
      fetch(contentURL)
        .then((response) => response.json())
        .then((content) => this.setState({contentState: content}))

      fetch(mainPhtoURL)
        .then((response) => response.text())
        .then((mainPhoto) => {
          if(mainPhoto === "unfound"){
            // no blog post with the give characteristics
            this.setState({
              valid: false
            })
          }else{
            this.setState({mainBlogPhoto: mainPhoto})
          }
          
        })

      fetch(photosURL)
        .then((response) => response.json())
        .then((photos) => this.setState({blogPhotos: photos}))
    }else{
      console.log("hi");
      this.setState({
        status: "done"
      })
    }
  }

  render() {
    if(this.state.status === "loading"){
      return <p id = "loading">loading...</p>
    }

    if(!this.state.valid){
      return <Four04/>;
    }else{
      if()
      return <h2>valid</h2>
    }
    
  }
}


export default Blog;