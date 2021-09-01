import React from 'react';

// will recieve a prop item based on the blog we are supposed to display
class SelfDisplay extends React.Component { 
    render() {
        let info = this.props.blogInfo
        console.log(info);
        let link;
        if(this.props.public === undefined){
            link = "/edit_blog?id=" + info.idNum;
        }else{
            link = "/blog/" + info.idNum + "/" + info.title.replaceAll(" ", "+") + "?author=" + info.author  + "&id=" + info.idNum;
            console.log(link);
            //blog/6/various+things?author=royhe62&id=6
        }
        let imgSrc = info.mainPicURL;
        let title = info.title
        console.log(imgSrc);


        //return <h2>hi!</h2>;
        
        return (
            <div className = "blogPart">
                <a href = {link}>
                    <img src = {imgSrc} alt = {title}/>
                </a>
                <div className = "blogPart-text">
                    <h2>{title}</h2>
                </div>
            </div>
        )
    }
}

export default SelfDisplay;