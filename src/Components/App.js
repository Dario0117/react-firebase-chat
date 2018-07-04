import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import firebaseConfig from '../firebase-config'
import Connect from './Connect'
import ChatBox from './ChatBox'
import Message from '../DataStructures/Message'
import AttachmentImage from '../DataStructures/Attachments/Image'
import AttachmentLink from '../DataStructures/Attachments/Link'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.database = null;
        this.CHATROOMS = 'chatrooms/';
        this.MESSAGES = 'messages/';

        this.state = {
            chatMessages: [],
            roomName: '',
            username: '',
            isConnected: false,
        }
    }

    getMessagesFromSnap = snap => {
        let snapRaw = snap.val();
        if (snapRaw === null) {
            return []
        }
        let snapKeys = Object.keys(snapRaw);
        return snapKeys.map(k => {
            let msg = new Message();
            msg.id = k;
            msg.message = snapRaw[k].message;
            msg.username = snapRaw[k].username;
            let attachments = snapRaw[k].attachments;
            if (attachments) {
                if (attachments.image) {
                    let img = new AttachmentImage();
                    img.full = attachments.image.full;
                    img.thumbnail = attachments.image.thumbnail;
                    msg.addImage(img);
                } else if (attachments.link) {
                    let link = new AttachmentLink();
                    link.description = attachments.link.description;
                    link.image = attachments.link.image;
                    link.title = attachments.link.title;
                    link.url = attachments.link.url;
                    msg.addLink(link);
                }
            }
            return msg;
        });
    }

    handleConnect = connectionData => {
        this.database
            .ref(`${this.CHATROOMS}/${connectionData.roomName}/${this.MESSAGES}`)
            .on('value', snap => {
                this.setState({
                    chatMessages: this.getMessagesFromSnap(snap),
                    roomName: connectionData.roomName,
                    username: connectionData.username,
                    isConnected: true,
                })
            })
    }

    handleDisconnect = () => {
        this.database
            .ref(`${this.CHATROOMS}/${this.state.roomName}/${this.MESSAGES}`)
            .off()
        this.setState({
            isConnected: false,
        })
    }

    handleSendMessage = input => {
        if (this.state.isConnected) {
            let msg = new Message();
            delete msg.id;
            msg.username = this.state.username;
            msg.message = input.message;
            if (input.attachmentType === 'img') {
                msg.addImage(input.attachment);
            }
            if (input.attachmentType === 'link') {
                msg.addLink(input.attachment);
            }
            this.database
                .ref(`${this.CHATROOMS}/${this.state.roomName}/${this.MESSAGES}`)
                .push()
                .set(msg)
        }
    }

    componentDidMount = () => {
        firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
    }

    render() {
        let connectionStatus = '';
        let chatbox = '';
        if (this.state.isConnected) {
            connectionStatus = <h2>Your status is online</h2>
            chatbox = (
                <ChatBox
                    handleSendMessage={this.handleSendMessage}
                    messageList={this.state.chatMessages}
                />
            );
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
                {chatbox}
            </div>
        )
    }
}
