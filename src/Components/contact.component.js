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
    this.onSubmit = this.onSubmit.bind(this);
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
    let URL = "https://cwen-backend.herokuapp.com/recieve_contact?name=" + encodeURI(this.state.Name).replaceAll(" ", "+")
    +  "&email=" + encodeURI(this.state.Email).replaceAll(" ", "+")
    + "&subject=" + encodeURI(this.state.Subject).replaceAll(" ", "+")
    +"&message=" + encodeURI(this.state.Message).replaceAll(" ", "+")
    console.log(URL);
    fetch(URL)
      .then(response => response.text())
      .then((text) =>{
        console.log(text);
          if(text === "Succes!"){
              this.setState({
                Submitted: true
              })}})
  }

  render() {
    if(this.state.Submitted){
      return <h2 className = "generic">Thank you for your message. We will get back to you as soon as possible.</h2>
    }
    return (
        <div id = "contactPage">
          <div id = "contactInfo">
            <h2>CWEN Contact Page</h2>
            <h3>Please use the form below to get in touch.</h3>
          </div>
          <div id = "contactForm">
            <div>
              <div className = "contactFormTop">
                <h3>Name</h3>
                <input type = "text" id = "Name" value={this.state.Name} onChange={this.onChangeName}/>
              </div>
              <div className = "contactFormTop">
                <h3>Email</h3>
                <input type = "text" id = "Email" value={this.state.Email} onChange={this.onChangeEmail}/>
              </div>
            </div>
            <h3>Topic</h3>
            <input type = "text" id = "Topic" value={this.state.Topic} onChange={this.onChangeTopic}/>
            <h3>Message</h3>
            <textarea rows="5" id = "Message" value={this.state.Message} onChange={this.onChangeMessage}> </textarea>
            <br/>
            <div id = "submitLink">
                <a onClick = {this.onSubmit}>Send Message!</a>
            </div>
          </div>
        </div>
    );
  }
}



export default Contact;