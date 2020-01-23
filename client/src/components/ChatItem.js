import React, {Component} from 'react';
import openSocket from 'socket.io-client';
import "./ChatItem.css";
import ReactMarkdown from 'react-markdown';



export default class ChatItem extends Component{

  handleClick(_id) {



    const requestOptions = {
      method: 'DELETE'


    };
    
    fetch("http://localhost:3001/api/chat/" + _id, requestOptions).then((response) => {
      return response.json();

      
    }).then((result) => {
      
      console.log('data result > ', result);
      
      const socket = openSocket('http://localhost:3002/');
      socket.emit('delete-message');
      

      // do what you want with the response here


    });
  }

  render() {
    return (
      <div>
        <div className="line text-muted"></div>

        <div className="separator text-muted">

          <time>{this.props.dateTime}</time>
        </div>


        <article className="panel panel-primary">



          <div className="panel-heading icon">
            <i>
              <button className="button button5" onClick={() => { this.handleClick(this.props._id) }} ></button>
            </i>
          </div>


          <div className="panel-heading">
            <h2 className="panel-title">{this.props.user}</h2>
          </div>
          


          <div className="panel-body">
            {/* {this.props.message} */}
          <ReactMarkdown source={this.props.message} />
          </div>


          <div className="panel-footer">
            <small>{/* {this.props._id} */}</small>
          </div>


        </article>
      </div>
    )
    
  }
}


