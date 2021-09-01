import React from 'react';

class BlogBlock extends React.Component { 
    constructor(props){
        // will recieve a "content block from the blog component as this.props.block"
        // will recieve every image in the blog as an array called this.props.imageArray"
        // will recieve an id showing which image to show as an attirbute of the block called imgID
        super(props);

        
    }

    render() {
        console.log(this.props.block);
        let ranges = this.props.block.inlineStyleRanges

        if(this.props.block.imgID !== undefined){
            // returning an image using a presigned AWS URL
            // change this function so that we only do this with src's begining with "localhost"
            return <img style = {{height: [this.props.block.entityMap.data.height]}, {width: [this.props.block.entityMap.data.width]}} src = {this.props.imageArray[this.props.block.imgID]} alt = "not found"/>
        }

        if(this.props.block.text === ""){
            return <br/>
        }

        // handling inline style ranges
        if(ranges.length != 0){
            let str = this.props.block.text.replaceAll("<",	"&#60");
            let changes = [];

            for(let i = 0; i < ranges.length; i++){
                console.log(ranges[i]);
                let start = ranges[i].offset;
                let end = ranges[i].offset + ranges[i].length;


                let open = "";
                let closed = "";

                switch(ranges[i].style){
                    case "BOLD":
                        open = "<strong>"
                        break;
                    
                    case "ITALIC":
                        open = "<em>"
                        break;
                    
                    case "UNDERLINE":
                        open = "<u>"
                }

                closed = "</" + open.substr(1);

                let insert1 = {insert: start, text: open};
                let insert2 = {insert: end, text: closed};
                changes.push(insert1);
                changes.push(insert2);
            }

            // sorts the changes so that the last changes happen latest
            changes.sort(function compareFn(first, second){
                return second.insert - first.insert
            });

            // insert all changes
            for(let i = 0; i < changes.length; i++){
                str = str.slice(0, changes[i].insert) + changes[i].text + str.slice(changes[i].insert)
                this.props.block.text = str;
            }
        }


        // regular text
        return <p dangerouslySetInnerHTML ={{__html: this.props.block.text}} />
    }
}

export default BlogBlock;