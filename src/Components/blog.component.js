import React from 'react';
import Four04 from './404.component';
import BlogBlock from './blogBlock.component';

class Blog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: "loading",
      valid: true,
      contentBlocks: null,
      contentReady: false,
      contentEntityMap: null,
      mainBlogPhoto: "",
      blogPhotos: null,
      title: "",
      author: "",
      date: null,
      isPublished: false
    }

    this.publish = this.publish.bind(this);
    this.unpublish = this.unpublish.bind(this);
  }

  componentDidMount() {
    document.title = 'CWEN Blog';
    let query;
    if(this.props.locale === undefined){
      query = this.props.location.search;
    }else{
      query = this.props.locale;
    }
    let baseURL = "https://cwen-backend.herokuapp.com/"
    let id = ""
    let author = ""

    


    // getting the name and ID
    let authorIndex = query.indexOf("author=");
    let ampIndex = query.indexOf("&");
    let idIndex = query.indexOf("id=");

    if(authorIndex != -1 && ampIndex != -1 && idIndex != -1 || this.props.locale !== undefined && idIndex != -1){
      this.setState({
        valid: true,
      })
      id = query.substring(idIndex + "id=".length);
      author = query.substring(authorIndex + "author=".length, ampIndex);
      let contentURL;
      let mainPhtoURL;
      let photosURL;


      if(this.props.locale === undefined){
        contentURL = baseURL + "getBlogContent?author=" + author + "&id=" + id;
        mainPhtoURL= baseURL + "getBlogMainPhoto?author=" + author + "&id=" + id;
        photosURL = baseURL + "getBlogPhotos?author=" + author + "&id=" + id;
      }else{
        let id = ""
        let token = encodeURI(localStorage.getItem("token")).replaceAll("+","%2B")


        // getting the name and ID
        let idIndex = query.indexOf("id=");
        id = query.substring(idIndex + "id=".length);

        contentURL = baseURL + "getUnpublishedBlogContent?token=" + token + "&id=" + id;
        mainPhtoURL= baseURL + "getUnpublishedBlogMainPhoto?token=" + token + "&id=" + id;
        photosURL = baseURL + "getUnpublishedBlogPhotos?token=" + token + "&id=" + id;
      }


      
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
              } else if(content.entityMap[mapID].type === "LINK") { // add a link to the right place

                let linkStart = content.blocks[i].entityRanges[0].offset;
                let linkEnd = linkStart + content.blocks[i].entityRanges[0].length

                let before = content.blocks[i].text.substring(0, linkStart) // before the link
                let during = content.blocks[i].text.substring(linkStart, linkEnd) // text that is linked
                let after = content.blocks[i].text.substring(linkEnd) // after the link
                let url = content.entityMap[mapID].data.url // link we point to

                let addedLink = before + "<a href=\"" + url + "\">" + during + "</a>" + after;

                content.blocks[i].text = addedLink;
              }

              mapID++;
            }
          }
          let displayedAuthor = content.sqlStuff.author;

          if(content.sqlStuff.author === "Elizabeth") {
            displayedAuthor = "Elizabeth Nagasha - Community / IT Manager";
          } else if(content.sqlStuff.author === "Fathila") {
            displayedAuthor = "Nanozi Fathila - Head of Programs";
          }

          this.setState({
            contentBlocks: content.blocks,
            contentEntityMap: content.entityMap,
            contentReady: true,
            author: displayedAuthor,
            title: content.sqlStuff.title,
            date: content.sqlStuff.lastUpdated,
            isPublished: content.sqlStuff.isPublished,
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

  publish(){
    let baseURL = "https://cwen-backend.herokuapp.com/"
    let query = this.props.locale;


    let id = ""
    let token = encodeURI(localStorage.getItem("token")).replaceAll("+","%2B")


    // getting the name and ID
    let idIndex = query.indexOf("id=");
    id = query.substring(idIndex + "id=".length);

    let URL = baseURL + "publish?token=" + token + "&id=" + id;
    console.log(URL);

    fetch(URL)
      .then((response) => response.text())
      .then((text) => {
        console.log(text === "published");
        if(text === "published"){
          localStorage.setItem("Message", "Congragulations! Your piece has been published!");
          window.location.href = "/update"
        }
      })
  }

  unpublish(){
    let baseURL = "https://cwen-backend.herokuapp.com/"
    let query = this.props.locale;


    let id = ""
    let token = encodeURI(localStorage.getItem("token")).replaceAll("+","%2B")


    // getting the name and ID
    let idIndex = query.indexOf("id=");
    id = query.substring(idIndex + "id=".length);

    let URL = baseURL + "unpublish?token=" + token + "&id=" + id;
    console.log(URL);

    fetch(URL)
      .then((response) => response.text())
      .then((text) => {
        console.log(text === "unpublished");
        if(text === "unpublished"){
          localStorage.setItem("Message", "Your piece has been successfully hidden. Please make what changes you must, so that we can all see it again!");
          window.location.href = "/update"
        }
      })
  }

  render() {
    if(this.state.status === "loading"){
      return <p id = "loading">loading...</p>
    }

    console.log(this.state.isPublished);

    if(!this.state.valid){
      return <Four04/>;
    }else{
      return (
        <div id = "blog">
          <h1>{this.state.title}</h1>
          <h4>By {this.state.author}</h4>
          <h4>Published {this.state.date}</h4>
          <img id = "mainBlogPhoto" src = {this.state.mainBlogPhoto} alt = {this.state.title}/>
          {this.state.contentReady ? 
            ([this.state.contentBlocks.map((contentBlock) => <BlogBlock key = {contentBlock.key} imageArray = {this.state.blogPhotos} block = {contentBlock}/>)]) 
            : (<div/>)}
          {(this.props.locale !== undefined) ?
            ([this.state.isPublished === 1 ? 
              <button onClick = {() => this.unpublish()}>Unpublish</button> 
              :<button onClick = {() => this.publish()}>Publish</button>]):
            (<div/>)}
        </div>
      )
    }
    
  }
}


export default Blog;