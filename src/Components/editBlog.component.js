import React from 'react';
import RichTextEditor from './RichTextEditor.component';

class EditBlog extends React.Component { 
    constructor(props){
        super(props);

        let startingContent = null;

        

        this.state = {
            status: "loading",
            valid: false,
            oldContent: null,
            contentReady: false,
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
            oldContent: content,
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
            .then((photos) => this.setState({blogPhotos: photos, status: "done"}))
    }

    render() {
        if(this.state.status === "loading"){
            return <p id = "loading">loading...</p>
        }else{
            let allKey = []
            allKey[0] = this.state.oldContent;
            allKey[1] = this.state.mainBlogPhoto;
            allKey[2] = this.state.blogPhotos
            return <RichTextEditor key = {allKey} oldContent = {this.state.oldContent} oldMainPic = {this.state.mainBlogPhoto} oldPics = {this.state.blogPhotos}/>
        }
    }
}

export default EditBlog;