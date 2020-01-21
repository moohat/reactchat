import React, { Component } from "react";
import axios from 'axios';


class ChatForm extends Component {
  constructor(props) {
    super(props);
    this.state = { user: "", message: "" };

    this.handleChange = this.handleChange.bind(this); //binding handleChange
    this.handleSubmit = this.handleSubmit.bind(this); //binding handleSubmit

  }

  handleChange(event) {
    const user = event.target.user;
    this.setState({ [user]: event.target.value });
  }

  handleSubmit(event){
      event.preventDefault(); //agar tidak pindah halaman ketika disubmit

      const playLoad = {
          user: this.state.user,
          message: this.state.message
        }
          console.log('playLoad > ', playLoad);
          
  }

  render() {
    return (
        <div className="container mt-2 d-flex p-3 flex-column borderless">

      <form className="form" >
        <div className="form-group">
          <input
            type="text"
            name="user"
            value={this.state.user}
            className="form-control"
            placeholder="user"
            onChange={this.handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <textarea
            type="text"
            name="message"
            value={this.state.message}
            className="form-control"
            placeholder="messages"
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
        </div>
    );
  }
}

export default ChatForm;
