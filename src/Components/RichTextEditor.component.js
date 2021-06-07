import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';




class RichTextEditor extends React.Component {
    constructor(props) {
      super(props);
    }


    render() {
      return (
        <div className="App">
                <h2>CKEditor 5 using a custom build - decoupled editor</h2>
                <CKEditor
                    onReady={ editor => {
                        console.log( 'Editor is ready to use!', editor );

                        // Insert the toolbar before the editable area.
                        editor.ui.getEditableElement().parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editor.ui.getEditableElement()
                        );

                        this.editor = editor;
                    } }
                    onError={ ( { willEditorRestart } ) => {
                        // If the editor is restarted, the toolbar element will be created once again.
                        // The `onReady` callback will be called again and the new toolbar will be added.
                        // This is why you need to remove the older toolbar.
                        if ( willEditorRestart ) {
                            this.editor.ui.view.toolbar.element.remove();
                        }
                    } }
                    onChange={ ( event, editor ) => {
                      const data = editor.getData();
                      console.log( { data } );
                  } }
                    editor={ DecoupledEditor }
                    data="<p>Hello from CKEditor 5's decoupled editor!</p>"
                    config = {
                        [
                          ['Font','FontSize'],
                          ['Bold','Italic','Underline'],
                          ['TextColor','BGColor'],
                          ['JustifyLeft', 'JustifyCenter', 'JustifyRight']
                      ]
                  }
                />
            </div>
      );
    }
  }

  export default RichTextEditor;