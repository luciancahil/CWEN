import React from 'react';
import Blog from "./blog.component"

class Preview extends React.Component { 
    render() {
        console.log("hi");
        return (
            <div id = "previewBlog">
                <Blog locale = {this.props.location.search} />
            </div>
        )
    }
}

export default Preview;