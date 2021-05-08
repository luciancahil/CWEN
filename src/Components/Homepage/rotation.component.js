import React from 'react';

class Rotation extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            length: 2
        };
      }
    

    render() {
        return (
            <div id = "rotation-wrapper">
                <div id = "rotation">
                    <div className = "rotPart"></div>
                    <div className = "rotPart"></div>
                    <div className = "rotPart"></div>
                    <div className = "rotPart"></div>
                    <div className = "rotPart"></div>
                    <div className = "rotPart"></div>
                    <div className = "rotPart"></div>
                    <div className = "rotPart"></div>
                    <div className = "rotPart"></div>
                    <div className = "rotPart"></div>
                    <div className = "rotPart"></div>
                </div>
            </div>
        );
    }
}

export default Rotation;

//{this.props.articleTags.map(stuff => <ArticleBox info = {stuff}/>)}