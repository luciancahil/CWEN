import React from 'react';

class Featured extends React.Component { 
    componentDidMount() {
        document.title = 'CWEN - Featured Entrepreneur';
    }

    render() {
        return <h2>Featured Page</h2>;
    }
}


export default Featured;