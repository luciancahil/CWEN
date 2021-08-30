import React, {Component} from 'react';
import {ContentState, EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import {convertToRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Invalid from './invalid.component';

/*
  Props:
  editing will be true if we are editing a file that already exists, flase if we are making something new
*/
class RichTextEditor extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      uploadedImages: [],
      title: "",
      pic: "",
      picData: "",
      errorMessage: [],
      isWriter: true
    };

    

    let token = localStorage.getItem("token");
    let tokenCheckURL = encodeURI("https://cwen-backend.herokuapp.com/check_token?token=" + token)
    tokenCheckURL = tokenCheckURL.replaceAll("+","%2B")

    if(token === null){
      this.setState({
        isWriter: false
     })
    }else{
      fetch(tokenCheckURL)
        .then(response => response.json())
        .then(data =>{
          console.log(data)
          if(data.title !== "admin" && data.title !== "writer"){
            this.setState({
              isWriter: false
            })
          }
        })
      }

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePic = this.onChangePic.bind(this);
    this.sendData = this.sendData.bind(this);
  }


  onEditorStateChange(editorState){
    // console.log(editorState)
    this.setState({
      editorState,
    });
    
    // look at entity map for image information 
      //console.log("json: " + JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())));
     // console.log(convertToRaw(this.state.editorState.getCurrentContent()));
     // console.log(this.state.uploadedImages);
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

    let url = "https://cwen-backend.herokuapp.com/newBlog?token=" + encodeURI(localStorage.getItem("token")).replaceAll("+","%2B") + "&title=" + sanitizedTitle


    // the content state storing information about blog text
    
    console.log(JSON.stringify(rawContentObj));
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

    for(let i = 0; i < upladedImageArray.length; i++){
      fd.append('photos', upladedImageArray[i].file);
    }


    console.log("fetching");
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