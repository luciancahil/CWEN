import React from 'react';
import RichTextEditor from './RichTextEditor.component';

class EditBlog extends React.Component { 
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
            .then((content) => console.log(content));
        
        fetch(mainPhtoURL)
            .then((response) => response.text())
            .then((picture) => console.log("pic: " + picture));

        fetch(photosURL)
            .then((response) => response.json())
            .then((pictures) => console.log(pictures));
    }

    render() {
        return <h2>EditBlog Page</h2>;
    }
}

export default EditBlog;