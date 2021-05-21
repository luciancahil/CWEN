import React from 'react';

class Featured extends React.Component { 
    constructor(props){
        super(props);

        this.state = {
            typed: ""
        }
    }

    componentDidMount() {
        this.typeWriter(this.props.inputString);
      }
    
      typeWriter(string) {
        if (string.length === 0) {
          return;
        } else {
          this.setState((state, props) => ({
            typed: state.typed.concat(string[0])
          }));
    
          setTimeout(() => this.typeWriter(string.slice(1)), 50);
        }
      }

    render() {
        let typedSlogan = this.state.typed;
        let topSlogan = "top";
        let botSlogan = "";

        if(typedSlogan.length < 36){
            topSlogan = typedSlogan;
        }else{
            topSlogan = typedSlogan.substr(0, 35);
            botSlogan = typedSlogan.substr(35);
        }
        


        return (
            <div id = "Slogan">
                <h2 id = "first_line">{topSlogan}</h2>
                <h2 id = "second_line">{botSlogan}</h2>
            </div>
        );
    }
}

export default Featured;