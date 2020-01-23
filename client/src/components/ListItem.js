import React, {Component} from 'react';
import axios from 'axios';
import ChatItem from './ChatItem';
import openSocket from 'socket.io-client';


const API_URL = 'http://localhost:3001/api/chat'


class ListItem extends Component{
    state = {
        _id: '',
        user: '',
        message: '',
        dateTime: '',
        chats: []
    }

    componentDidMount(){
        const socket = openSocket('http://localhost:3002/');
        
        // //this socket get delete message
        socket.on('receive-dm', () =>{
            console.log('socket receive dm');
            axios.get(API_URL)
            .then(res =>{
                this.setState({chats: [...res.data]});
                console.log('dataState > ', res.data);                
            })
            .catch(err => console.log(err));            
        });

        //get data from datachat router datachat
        axios.get(API_URL)
        .then(res =>{
            this.setState({chats: [...res.data]});
            console.log('dataState > ', res.data);
            
        }).catch(err => console.log(err));

    //    This Socket receive message
       socket.on('receive-message', msg => {
        console.log('recived', msg);

        this.setState({
            chats: [...this.state.chats, msg]
        });
    });

    }

    render(){
        const data = this.state.chats.map((params, index) =>
        
        <ChatItem        
        key={index}
        _id = {params._id}
        user={params.user}
        message={params.message}
        dateTime={params.dateTime}
        />
        
        
        )
        return(
            <div>
                <div id="myDIV">
                    <div className="card" >
                        <div id="content">
                            <div className="card">
                                <div>
                                    <div className="timeline">
                                        {data}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListItem;
