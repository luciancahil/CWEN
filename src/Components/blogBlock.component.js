import React from 'react';

class BlogBlock extends React.Component { 
    constructor(props){
        // will recieve a "content block from the blog component as this.props.block"
        super(props);

        
    }

    render() {
        return <p>{this.props.block.text}</p>
    }
}

export default BlogBlock;