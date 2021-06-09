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
      uploadedImages: []
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
  }

  onEditorStateChange(editorState){
    // console.log(editorState)
    this.setState({
      editorState,
    });

    console.log(convertToRaw(this.state.editorState.getCurrentContent()).blocks);
  };

  onContentStateChange(contentState){
    // console.log(editorState)
    this.setState({
      contentState,
    });

    console.log(convertToRaw(this.state.contentState.getCurrentContent()));
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
    

    render() {
      const { editorState } = this.state;
      return (
        
        <div className='editor'>
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
                previewImage: true,
              },
            }}
          />
        </div>
      );
    }
  }

  export default RichTextEditor;