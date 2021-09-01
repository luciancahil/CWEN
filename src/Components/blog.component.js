import React from 'react';
import Four04 from './404.component';
import BlogBlock from './blogBlock.component';

class Blog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: "loading",
      valid: false,
      contentBlocks: null,
      contentReady: false,
      contentEntityMap: null,
      mainBlogPhoto: "",
      blogPhotos: null,
      title: "",
      author: "",
      date: null
    }
  }

  componentDidMount() {
    document.title = 'CWEN Blog';
    let query = this.props.location.search;
    let baseURL = "https://cwen-backend.herokuapp.com/"
    let id = ""
    let author = ""


    // getting the name and ID
    let authorIndex = query.indexOf("author=");
    let ampIndex = query.indexOf("&");
    let idIndex = query.indexOf("id=");

    if(authorIndex != -1 && ampIndex != -1 && idIndex != -1){
      this.setState({
        valid: true,
      })
      id = query.substring(idIndex + "id=".length);
      author = query.substring(authorIndex + "author=".length, ampIndex);

      let contentURL = baseURL + "getBlogContent?author=" + author + "&id=" + id;
      let mainPhtoURL= baseURL + "getBlogMainPhoto?author=" + author + "&id=" + id;
      let photosURL = baseURL + "getBlogPhotos?author=" + author + "&id=" + id;

      
      fetch(contentURL)
        .then((response) => response.json())
        .then((content) => {
          let date = new Date();


          //mapping entitymaps with contentstates
          let mapID = 0;
          let imageID = 0;

          for(let i = 0; i < content.blocks.length; i++){
            
            if(content.blocks[i].entityRanges.length !== 0){
              content.blocks[i].entityMap = content.entityMap[mapID];
              
              if(content.entityMap[mapID].type === "IMAGE"){
                content.blocks[i].imgID = imageID;
                imageID++;
              }

              mapID++;
            }
          }

          this.setState({
            contentBlocks: content.blocks,
            contentEntityMap: content.entityMap,
            contentReady: true,
            author: content.sqlStuff.author,
            title: content.sqlStuff.title,
            date: content.sqlStuff.lastUpdated,
            status: "done"
          })
        })

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
      return <div id = "blog">
        <h1>{this.state.title}</h1>
        <h4>By {this.state.author}</h4>
        <h4>Published {this.state.date}</h4>
        <img id = "mainBlogPhoto" src = {this.state.mainBlogPhoto} alt = {this.state.title}/>
        {this.state.contentReady ? 
          ([this.state.contentBlocks.map((contentBlock) => <BlogBlock key = {contentBlock.key} imageArray = {this.state.blogPhotos} block = {contentBlock}/>)]) : (<div/>)}
        </div>
    }
    
  }
}


export default Blog;