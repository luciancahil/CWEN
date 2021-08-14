import React from 'react';

class Contact extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Name: "",
      Email: "",
      Topic: "",
      Message: "",
      Submitted: false
    }

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeTopic = this.onChangeTopic.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
  }

  componentDidMount() {
    document.title = 'Contact Community Women Enterprise Network (CWEN)';

    
  }

  onChangeName(e){
    e.preventDefault();

    this.setState({
      Name: e.target.value
    })
  }

  onChangeEmail(e){
    e.preventDefault();

    this.setState({
      Email: e.target.value
    })
  }

  onChangeTopic(e){
    e.preventDefault();

    this.setState({
      Topic: e.target.value
    })
  }

  onChangeMessage(e){
    e.preventDefault();

    this.setState({
      Message: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();
  }

  render() {
    console.log(this.state);
    return (
        <div id = "contactPage">
          <h3>Name</h3>
          <input type = "text" id = "Name" value={this.state.Name} onChange={this.onChangeName}/>
          <h3>Email</h3>
          <input type = "text" id = "Email" value={this.state.Email} onChange={this.onChangeEmail}/>
          <h3>Topic</h3>
          <input type = "text" id = "Topic" value={this.state.Topic} onChange={this.onChangeTopic}/>
          <h3>Message</h3>
          <textarea rows="3" id = "Message" value={this.state.Message} onChange={this.onChangeMessage}> </textarea>
          <br/>
          <div id = "submitLink">
              <a onClick = {this.onSubmit}>Send Message!</a>
          </div>
        </div>
    );
  }
}



export default Contact;