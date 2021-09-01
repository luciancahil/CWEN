import React from 'react';

class BlogBlock extends React.Component { 
    constructor(props){
        // will recieve a "content block from the blog component as this.props.block"
        // will recieve every image in the blog as an array called this.props.imageArray"
        // will recieve an id showing which image to show as an attirbute of the block called imgID
        super(props);

        
    }

    render() {
        //console.log(this.props.block);
        let ranges = this.props.block.inlineStyleRanges
        this.props.block.text = this.props.block.text.replaceAll("<",	"&#60");

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
            let str = this.props.block.text
            let changes = [];

            for(let i = 0; i < ranges.length; i++){
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
                        break;
                    
                    case "STRIKETHROUGH":
                        open = "<s>"
                        break; 
                }

                // looking at font families
                let insert1 = {insert: 0, text: ""};
                let insert2 = {insert: 0, text: ""};

                if(ranges[i].style.substr(0,8) === "fontsize"){
                    let size = ranges[i].style.substr(9);
                    insert1 = {insert: start, text: "<span style =\"font-size:" + size + "px;\">"};
                    insert2 = {insert: end, text: "</span>"};
                    
                }else if(ranges[i].style.substr(0,10) === "fontfamily"){
                    let font = ranges[i].style.substr(11);
                    insert1 = {insert: start, text: "<span style =\"font-family:" + font + "px;\">"};
                    insert2 = {insert: end, text: "</span>"};

                }else{

                    closed = "</" + open.substr(1);

                    insert1 = {insert: start, text: open};
                    insert2 = {insert: end, text: closed};
                }
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


        let DynamicTag = "p"

        switch(this.props.block.type){
            case "header-one":
                DynamicTag = "h1"
                break;
            
            case "header-two":
                DynamicTag = "h2"
                break;

            case "header-three":
                DynamicTag = "h3"
                break;
                
            case "header-four":
                DynamicTag = "h4"
                break;
            
            case "header-five":
                DynamicTag = "h5"
                break;

            case "header-six":
                DynamicTag = "h6"
                break;
            
            case "blockquote":
                DynamicTag = "em"
                break;
            
            case "unordered-list-item":
                DynamicTag = "li"
                break;
            
            case "ordered-list-item":
                DynamicTag = "li"
                break;
        }


        // regular text
        return <DynamicTag dangerouslySetInnerHTML ={{__html: this.props.block.text}} />
    }
}

export default BlogBlock;