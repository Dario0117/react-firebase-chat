import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import firebaseConfig from '../firebase-config'
import Connect from './Connect'
import ChatBox from './ChatBox'
import Message from '../DataStructures/Message'
import AttachmentImage from '../DataStructures/Attachments/Image'
import AttachmentLink from '../DataStructures/Attachments/Link'
import {
    ATTACHMENT_TYPE_IMAGE,
    ATTACHMENT_TYPE_LINK,
} from '../DataStructures/Constants'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.database = null;
        this.CHATROOMS = 'chatrooms/';
        this.MESSAGES = 'messages/';

        this.storage = null;

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

    handleSendMessage = async input => {
        if (this.state.isConnected) {
            let msgRef = this.database
                .ref(`${this.CHATROOMS}/${this.state.roomName}/${this.MESSAGES}`)
                .push()
            let msg = new Message();
            delete msg.id;
            msg.username = this.state.username;
            msg.message = input.message;
            if (input.attachmentType === ATTACHMENT_TYPE_IMAGE) {
                let url = await this.uploadContent({
                    name: msgRef.key,
                    content: input.attachment.full,
                })
                let img = new AttachmentImage();
                img.full = url;
                img.thumbnail = url;
                msg.addImage(img);
            }
            if (input.attachmentType === ATTACHMENT_TYPE_LINK) {
                msg.addLink(input.attachment);
            }
            msgRef.set(msg)
        }
    }

    uploadContent = file => {
        return new Promise((resolve, reject) => {
            if (this.state.isConnected) {
                let imgRef = this.storage
                    .ref(`${this.CHATROOMS}/${this.state.roomName}`)
                    .child(file.name)

                imgRef.putString(file.content, 'data_url')
                    .then(() => {
                        imgRef.getDownloadURL()
                            .then(resolve)
                            .catch(reject)
                    })
            }
        })
    }

    componentDidMount = () => {
        firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
        this.storage = firebase.storage();
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
