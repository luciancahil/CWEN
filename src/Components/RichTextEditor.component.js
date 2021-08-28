import React, {Component} from 'react';
import {ContentState, EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import {convertToRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class RichTextEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      uploadedImages: [],
      title: "",
      pic: "",
      picData: ""
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangePic = this.onChangePic.bind(this);
  }

  onEditorStateChange(editorState){
    // console.log(editorState)
    this.setState({
      editorState,
    });
    
    // look at entity map for image information 
    console.log(convertToRaw(this.state.editorState.getCurrentContent()));
    console.log(this.state.uploadedImages);
    console.log("title: " + this.state.title);

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
    

  render() {
    const { editorState } = this.state;
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
        <button>Preview</button>
        <button>Save</button>
      </div>
    );
  }
}

export default RichTextEditor;