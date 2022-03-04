import React from 'react';

class Video extends React.Component { 
    render() {
        return (
            <div id = "tv-wrapper">
                <iframe id = "trailer" width="420" height="315"
                    src="https://www.youtube.com/embed/od1fL3m302Q">
                </iframe>
            </div>
        );
    }
}

export default Video;