import React, { Component} from 'react';
import '../App.css'
import ChatForm from './ChatForm';
import ListItem from './ListItem';
// import ChatItem from './ChatItem';

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] }

    }
    render() {
        return (
            <div>
                <div className="card-header  text-center bg-dark text-white">
                    <h1> REACT CHAT </h1>
                </div>
                <div className="card-body">
                
                <ListItem data={this.state.data}/>
                {/* <ChatItem /> */}
                <br />
                <ChatForm inputSave={this.inputSave}/>
                </div>
            </div>

        )
    }

}
export default ChatBox;

