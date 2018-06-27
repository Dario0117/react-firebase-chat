import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import firebaseConfig from '../firebase-config'
import uniqid from 'uniqid'
import Connect from './Connect'
import ChatBox from './ChatBox'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.database = null;
        this.msgDB = 'messages/';

        this.state = {
            chatMessages: [],
            roomName: '',
            username: '',
            isConnected: false,
        }
    }

    parseSnap = (snap) => {
        let snapRaw = snap.val();
        if(snapRaw === null) {
            return []
        }
        let snapKeys = Object.keys(snapRaw);
        return snapKeys.map(k => Object.assign({ id: k }, snapRaw[k]));
    }

    handleConnect = connectionData => {
        this.database
            .ref(`${this.msgDB}/${connectionData.roomName}`)
            .on('value', snap => {
                this.setState({
                    chatMessages: this.parseSnap(snap),
                    roomName: connectionData.roomName,
                    username: connectionData.username,
                    isConnected: true,
                })
            })
    }

    handleDisconnect = () => {
        this.database
            .ref(`${this.msgDB}/${this.state.roomName}`)
            .off()
        this.setState({
            isConnected: false,
        })
    }

    handleSendMessage = message => {
        let id = uniqid();
        let msg = {
            username: this.state.username,
            message,
        }
        if(this.state.isConnected) {
            this.database
                .ref(`${this.msgDB}/${this.state.roomName}/${id}`)
                .set(msg)
        }
    }

    componentDidMount = () => {
        firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
    }

    render() {
        let connectionStatus = ''
        if (this.state.isConnected) {
            connectionStatus = <h2>Your status is online</h2>
        } else {
            connectionStatus = <h2>Your status is offline</h2>
        }
        return (
            <div>
                <h1>React firebase chat</h1>
                {connectionStatus}
                <Connect
                    handleConnect={this.handleConnect}
                    handleDisconnect={this.handleDisconnect}
                />
                <ChatBox
                    handleSendMessage={this.handleSendMessage}
                    messageList={this.state.chatMessages}
                />
            </div>
        )
    }
}
