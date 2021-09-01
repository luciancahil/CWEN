import React, {Component} from 'react';
import {ContentState, EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import {convertToRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Invalid from './invalid.component';
import { convertFromRaw } from 'draft-js';

/*
  Props:
  this.props.oldContent will store contentBLock if we are editing, undefined if not
  this.props.oldMainPic  will store MainPic if we are editing, undefined if not
  this.props.oldPics will store old blog photos if we are editing, undefined if not
  this.props.idNum will store an index if editing
*/
class RichTextEditor extends React.Component {
  constructor(props){
    super(props);
    let startingContent = null;
    let startingTitle = "";
    let oldPics = this.props.oldPics;
    let startingPic = "";

    if(this.props.oldContent !== undefined && this.props.oldContent !== null && oldPics != null){
      let content = this.props.oldContent;
      let entMap = content.entityMap;
      let imgIndex = 0;
      let entIndex = 0;

      while(entMap[entIndex] !== undefined){
        let ent = entMap[entIndex];
        if(ent.type === "IMAGE"){
          ent.data.src = oldPics[imgIndex];
          imgIndex++;
        }
        entIndex++;
      }

      startingTitle = content.sqlStuff.title;
      startingPic = this.props.oldMainPic;

      startingContent = EditorState.createWithContent(convertFromRaw(content))
    }

    this.state = {
      editorState: startingContent,
      uploadedImages: [],
      title: startingTitle,
      pic: startingPic,
      picData: "",
      errorMessage: [],
      isWriter: true,
      index: -1
    };


    

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePic = this.onChangePic.bind(this);
    this.sendData = this.sendData.bind(this);
    this.updateBlog = this.updateBlog.bind(this);
    this.createNewBlog = this.createNewBlog.bind(this);
  }

  componentDidMount(){
    let token = localStorage.getItem("token");
    let tokenCheckURL = encodeURI("https://cwen-backend.herokuapp.com/check_token?token=" + token);
    tokenCheckURL = tokenCheckURL.replaceAll("+","%2B");
   


    if(token === null){
      this.setState({
        isWriter: false
     })
    }else{
      fetch(tokenCheckURL)
        .then(response => response.json())
        .then(data =>{
          if(data.title !== "admin" && data.title !== "author"){
            this.setState({
              isWriter: false
            })
          }
        })
    }
  }


  onEditorStateChange(editorState){
    // console.log(editorState)
    this.setState({
      editorState,
    });
    
    // look at entity map for image information 
  //    console.log((convertToRaw(this.state.editorState.getCurrentContent())));
   //   console.log(convertToRaw(this.state.editorState.getCurrentContent()));
    //  console.log(this.state.uploadedImages);
   // console.log("title: " + this.state.title);

    /*
    Uploading Steps:
    Step 1: extract files from the state uploaded Images array that matches a source from the entity map.
    Step 2: Upload all images to S3, and get URL
    Step 3: edit the entity map sources so thateditorState.getCurrentContent()).entityMap[NUMBER].data.src = url
    Step 4: JSON the whole thing, and send it to the backend.
    */
  };

  /*
    Notes on the raw data information:
    All text is stored in the blocks array.
    All image information (but not image itself) is stored in the entity maps array.

    BLocks[0].text says the content of the text
    Blocks[0].inlineStyleRanges says the range of styles, like bold, italics, and fontsize (default to 16), and color RGB

    Blocks[0].data stores link information

    Blocks[0].type includes text that states if it is normal (p), an h tag, an ordered/unorded list. Will say "atomic" if
    it is an an image

    Blocks[0].type will not state which order the list item is in. ONly that it is a list element. 
    We could potentially handle that by creating a type that just has this placed in an "li" component
    
  */

  onContentStateChange(contentState){
    // console.log(editorState)
    this.setState({
      contentState,
    });

    console.log(convertToRaw(this.state.contentState.getCurrentContent().json()));
  };

  uploadImageCallBack(file) {
    // long story short, every time we upload an image, we
    // need to save it to the state so we can get it's data
    // later when we decide what to do with it.

    // Make sure you have a uploadImages: [] as your default state
    let uploadedImages = this.state.uploadedImages;

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    }

    uploadedImages.push(imageObject);

    this.setState({ uploadedImages: uploadedImages })

    // We need to return a promise with the image src
    // the img src we will use here will be what's needed
    // to preview it in the browser. This will be different than what
    // we will see in the index.md file we generate.
    return new Promise(
      (resolve, reject) => {
        resolve({ data: { link: imageObject.localSrc } });
      }
    );
  } 

  onChangeTitle(e){
    e.preventDefault();

    this.setState({
      title: e.target.value
    })
  }

  onChangePic(e){
    e.preventDefault();
    let data = new FormData();
    let file = e.target.files[0];

    data.append('pic', file, file.name)

    this.setState({
        pic: URL.createObjectURL(e.target.files[0]),
        picData: e.target.files[0]
    })
  }

  sendData(){
    if(this.props.oldContent === undefined){
      this.createNewBlog();
    }else{
      this.updateBlog()
    }
  }

  updateBlog(){
    // very similar to createNew blog, just different url and attach an "oringial ID" to all images that don't have an src starting with localhost.
    // or maybe not?
    // wait. Yes. I just need to change the blog so that only the localhosts get replaced with AWS. Other images should be fine just the way they are
    let valid = true;
    let errors = [];

    

    if(this.state.title === ""){
      valid = false;
      errors.push("Error! Blog posts need a title");
    }

    this.setState({
      errorMessage: errors
    })


    if(!valid){
      return;
    }

    let fd = new FormData();
    let rawContentObj = convertToRaw(this.state.editorState.getCurrentContent());
    let upladedImageArray = this.state.uploadedImages;
    let oldPics = this.props.oldPics

    //TODO CHANGE THIS

    let sanitizedTitle = encodeURI(this.state.title).replaceAll(" ", "+");

    let url = "http://localhost:4000/updateBlog?token=" + encodeURI(localStorage.getItem("token")).replaceAll("+","%2B") 
      + "&title=" + sanitizedTitle + "&id=" + this.props.idNum

    

    /*
    All images will be in the uploadedImages array, including deleted and un uploaded images.
    To check if they should be there, check the entitymap.data.src in the content state. Only 
    imates that appear there should be uploaded
    */
    let imageSrcSets = new Set();

    for(let i = 0; i < Math.pow(2, 10); i++){
      let entity = rawContentObj.entityMap[i]      
      if(entity === undefined){
        break;
      }

      imageSrcSets.add(entity.data.src);
    }

    //console.log(upladedImageArray[0].localSrc);
    upladedImageArray = upladedImageArray.filter(image => imageSrcSets.has(image.localSrc));

    // now we need to add an indexValue to every entityMap that starts with aws
    
    const urlIndex = new Map();
    for(let i = 0; i < oldPics.length; i++){
      urlIndex.set(oldPics[i], i);
    }
  
    
    for(let i = 0; i < Math.pow(2, 10); i++){
      let entity = rawContentObj.entityMap[i]      
      if(entity === undefined){
        break;
      }

      if(entity.type !== "IMAGE"){
        continue;
      }

      if (urlIndex.has(entity.data.src)){
        entity.originalIndex = urlIndex.get(entity.data.src);
      }

    }

    // I think that's everything. Now just add the formdatas, while understanding that the formdata for the mainPhoto might be null

    fd.append('data', JSON.stringify(rawContentObj));

    if(this.state.picData !== ""){
      fd.append('mainPhoto', this.state.picData);
    }

    for(let i = 0; i < upladedImageArray.length; i++){
      fd.append('photos', upladedImageArray[i].file);
    }

    console.log("fetching...");
    fetch(url, {
      method: 'POST',
      body: fd,
    })
      .then(response => response.text())
      .then(data => {
          if(data === "done!"){
            console.log("good");
          }
          console.log(data);
      });
  }

  createNewBlog(){
        // first, we add the content state as JSON
    // then, we store the main image at the top of the article
    let valid = true;
    let errors = [];

    if(this.state.title === ""){
      valid = false;
      errors.push("Error! Blog posts need a title");
    }

    if(this.state.picData === ""){
      valid = false;
      errors.push("Error! Blog posts need a main image");
    }


    this.setState({
      errorMessage: errors
    })

    if(!valid){
      
      return;
    }
    
    let fd = new FormData();
    let rawContentObj = convertToRaw(this.state.editorState.getCurrentContent());
    let upladedImageArray = this.state.uploadedImages;

    //TODO CHANGE THIS

    let sanitizedTitle = encodeURI(this.state.title).replaceAll(" ", "+");

    let url = "https://cwen-backend.herokuapp.com/newBlog?token=" + encodeURI(localStorage.getItem("token")).replaceAll("+","%2B") 
      + "&title=" + sanitizedTitle


    // the content state storing information about blog text
    
    fd.append('data', JSON.stringify(rawContentObj));

    fd.append('mainPhoto', this.state.picData);



    /*
    All images will be in the uploadedImages array, including deleted and un uploaded images.
    To check if they should be there, check the entitymap.data.src in the content state. Only 
    imates that appear there should be uploaded
    */
    let imageSrcSets = new Set();

    for(let i = 0; i < Math.pow(2, 10); i++){
      let entity = rawContentObj.entityMap[i]      
      if(entity === undefined){
        break;
      }

      imageSrcSets.add(entity.data.src);
    }

    //console.log(upladedImageArray[0].localSrc);
    upladedImageArray = upladedImageArray.filter(image => imageSrcSets.has(image.localSrc));

    url += "&numPhotos=" + upladedImageArray.length;

    for(let i = 0; i < upladedImageArray.length; i++){
      fd.append('photos', upladedImageArray[i].file);
    }


    console.log("fetching");
    console.log(url);
    fetch(url, {
      method: 'POST',
      body: fd,
    })
      .then(response => response.text())
      .then(data => {
          if(data === "done!"){
            console.log("good");
          }
          console.log(data);
      });
  }
    

  render() {
    const { editorState } = this.state;

    // invalid
    if(!this.state.isWriter){
      return <Invalid/>
    }
    

    return (
        
      <div className='editor'>
        <input type = "text" id = "articleTitle" placeholder = "Title" value = {this.state.title} onChange = {this.onChangeTitle}></input>
        <div id = "mainPhoto">
          <label for="articleHeader">Choose a main photo:</label><br/>
          <input type = "file" id = "articleHeader" onChange = {this.onChangePic}/>
        </div>
        {this.state.pic !== "" ? 
          (<div><img id = "blogMianPicDisplay" alt = "mainpic" src = {this.state.pic}/><h1 className = "blogMianPicDisplayText">Main Photo</h1></div>) : 
          (<div/>)}
        <div id = "trueEditor">
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            //onContentStateChange = {this.onContentStateChange}    
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: { 
                uploadCallback: this.uploadImageCallBack, 
                alt: { present: true, mandatory: false }, 
                previewImage: false,
              },
            }}
          />
        </div>
        {this.state.errorMessage.map((message) => <p className = "blogError" key = {message}>{message}</p>)}
        <button>Preview</button>
        <button onClick = {() => this.sendData()}>Save</button>
      </div>
    );
  }
}

export default RichTextEditor;