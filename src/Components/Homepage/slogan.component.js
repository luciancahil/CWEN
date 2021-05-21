import React from 'react';

class Featured extends React.Component { 
    render() {
        return (
            <div id = "Slogan">
                <h2 id = "first_line">{this.props.top}</h2>
                <h2 id = "second_line">{this.props.bottom}</h2>
            </div>
        );
    }
}

export default Featured;