import React, { Component } from "react";
import axios from "axios";
import openSocket from 'socket.io-client';
// import ReactMarkdown from 'react-markdown';

class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {user: '', message:''}

    // this.handleChangeUser = this.handleChangeUser.bind(this); //binding handleChangeUser
    // this.handleChangeMessage = this.handleChangeMessage.bind(this); //binding handleChangeUser
    this.handleSubmit = this.handleSubmit.bind(this); //binding handleSubmit
    // this.handleCancle = this.handleCancle.bind(this); //binding handleSubmit

  }

  // handleChangeUser(event) {
  //   this.setState({ user: event.target.value });
  // }

  // handleChangeMessage(event){
  //   this.setState({ message: event.target.value})
  // }

  //handle input dengan mengambil attribute name, misal tag input user name="user" tag input message name="message"
  handleInputChange = (event) =>{
    this.setState({[event.target.name]:event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault(); //agar tidak pindah halaman ketika disubmit
    // console.log('this cancel');
    
    const post = {
      user: this.state.user,
      message: this.state.message
    };
    console.log("post > ", post);

    //this socket connect post server
    const socket = openSocket('http://localhost:3002/');
    socket.emit('send-message', post );
    //

    axios.post('http://localhost:3001/api/chat/add',{
      user:this.state.user,
      message:this.state.message

      
    })
    .then(res =>{
      this.setState({
        // user: '',
        message: ''
      });
      console.log('post check 1', res);
      console.log('post check 2', res.data);
      
    })
  }
  
  handleCancle(event){
    this.setState({
      message: ''
    })
  }

  render() {
    // const input = '*test markdown*';
    return (
      <div className="container mt-2 d-flex p-3 flex-column borderless">
        <form className="form" onSubmit={this.handleSubmit}>
         
          <div className="form-group">            
            <input            
              type="text"
              name="user"
              value={this.state.user}
              className="form-control"
              placeholder="type username"              
              onChange={this.handleInputChange}
              required
            />
          </div>
          <br />
          <div className="form-group">
            <textarea
              type="text"
              name="message"
              value={this.state.message} 
              className="form-control"
              placeholder="type your messages here"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          
          <button type="button" className="btn btn-danger" onClick={this.handleCancle}>
            Reset
          </button>
          
        </form>
      </div>
    );
  }
}

export default ChatForm;
