import React from 'react';

class BlogBlock extends React.Component { 
    constructor(props){
        // will recieve a "content block from the blog component as this.props.block"
        // will recieve every image in the blog as an array called this.props.imageArray"
        // will recieve an id showing which image to show as an attirbute of the block called imgID
        super(props);

        
    }

    render() {
        //console.log(this.props.imageArray)

        if(this.props.block.imgID !== undefined){
            console.log(this.props.block.entityMap);
            let style = "height:" + this.props.block.entityMap.data.height + ";width:" + this.props.block.entityMap.data.width;
            return <img style = {{height: [this.props.block.entityMap.data.height]}, {width: [this.props.block.entityMap.data.width]}} src = {this.props.imageArray[this.props.block.imgID]} alt = "not found"/>
        }

        if(this.props.block.text === ""){
            return <br/>
        }


        // regular text
        return <p>{this.props.block.text}</p>
    }
}

export default BlogBlock;