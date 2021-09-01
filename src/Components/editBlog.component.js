import React from 'react';
import RichTextEditor from './RichTextEditor.component';

class EditBlog extends React.Component { 
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

    componentDidMount(){
        let baseURL = "http://localhost:4000/"
        let query = this.props.location.search;


        let id = ""
        let token = encodeURI(localStorage.getItem("token")).replaceAll("+","%2B")


        // getting the name and ID
        let idIndex = query.indexOf("id=");
        id = query.substring(idIndex + "id=".length);

        let contentURL = baseURL + "getUnpublishedBlogContent?token=" + token + "&id=" + id;
        let mainPhtoURL= baseURL + "getUnpublishedBlogMainPhoto?token=" + token + "&id=" + id;
        let photosURL = baseURL + "getUnpublishedBlogPhotos?token=" + token + "&id=" + id;
        
        console.log(contentURL)

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
    }

    render() {
        console.log(this.state);
        return <h2>EditBlog Page</h2>;
    }
}

export default EditBlog;