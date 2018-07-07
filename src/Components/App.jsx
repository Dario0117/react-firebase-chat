import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import firebaseConfig from '../firebase-config';
import SingInForm from './SingInForm';
import SingUpForm from './SingUpForm';
import ChatBox from './ChatBox';
import Message from '../DataStructures/Message';
import AttachmentImage from '../DataStructures/Attachments/Image';
import AttachmentLink from '../DataStructures/Attachments/Link';
import AttachmentVideo from '../DataStructures/Attachments/Video';
import {
    ATTACHMENT_TYPE_IMAGE,
    ATTACHMENT_TYPE_LINK,
    ATTACHMENT_TYPE_VIDEO,
} from '../DataStructures/Constants';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.database = null;
        this.CHATROOMS = 'chatrooms/';
        this.MESSAGES = 'messages/';

        this.storage = null;
        this.auth = null;

        this.state = {
            chatMessages: [],
            roomName: '',
            username: '',
            isConnected: false,
        };

        this.handleConnect = this.handleConnect.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.uploadContent = this.uploadContent.bind(this);
    }

    getMessagesFromSnap(snap) {
        let snapRaw = snap.val();
        if (snapRaw === null) {
            return [];
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
                } else if (attachments.video) {
                    let video = new AttachmentVideo();
                    video.name = attachments.video.name;
                    video.source = attachments.video.source;
                    msg.addVideo(video);
                }
            }
            return msg;
        });
    }

    handleConnect({ roomName, username }) {
        // TODO: Change value event for append child for optimization
        this.database
            .ref(`${this.CHATROOMS}/${roomName}/${this.MESSAGES}`)
            .on('value', snap => {
                this.setState({
                    roomName,
                    username,
                    chatMessages: this.getMessagesFromSnap(snap),
                    isConnected: true,
                });
            });
    }

    handleDisconnect() {
        this.database
            .ref(`${this.CHATROOMS}/${this.state.roomName}/${this.MESSAGES}`)
            .off();
        this.setState({
            isConnected: false,
        });
    }

    async handleSendMessage(input) {
        if (this.state.isConnected) {
            let msgRef = this.database
                .ref(`${this.CHATROOMS}/${this.state.roomName}/${this.MESSAGES}`)
                .push();
            let msg = new Message();
            delete msg.id;
            msg.username = this.state.username;
            msg.message = input.message;
            let url = '';
            switch (input.attachmentType) {
                case ATTACHMENT_TYPE_IMAGE: {
                    url = await this.uploadContent({
                        name: msgRef.key,
                        content: input.attachment.full,
                        type: input.attachmentType,
                    })
                    let img = new AttachmentImage();
                    img.full = url;
                    img.thumbnail = url;
                    msg.addImage(img);
                    break;
                }
                case ATTACHMENT_TYPE_LINK: {
                    msg.addLink(input.attachment);
                    break;
                }
                case ATTACHMENT_TYPE_VIDEO: {
                    url = await this.uploadContent({
                        name: msgRef.key,
                        content: input.attachment,
                        type: input.attachmentType,
                    });
                    let vid = new AttachmentVideo();
                    vid.name = input.attachment.name;
                    vid.source = url;
                    msg.addVideo(vid);
                    break;
                }
                default: {
                    break;
                }
            }
            msgRef.set(msg);
        }
    }

    uploadContent(file) {
        return new Promise((resolve, reject) => {
            if (this.state.isConnected) {
                let fileRef = this.storage
                    .ref(`${this.CHATROOMS}/${this.state.roomName}/${file.type}`)
                    .child(file.name);
                switch (file.type) {
                    case ATTACHMENT_TYPE_IMAGE: {
                        fileRef.putString(file.content, 'data_url')
                            .then(() => {
                                fileRef.getDownloadURL()
                                    .then(resolve)
                                    .catch(reject)
                            });
                        break;
                    }
                    case ATTACHMENT_TYPE_VIDEO: {
                        fileRef.put(file.content)
                            .then(() => {
                                fileRef.getDownloadURL()
                                    .then(resolve)
                                    .catch(reject)
                            })
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
        });
    }

    componentDidMount() {
        firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
        this.storage = firebase.storage();
        this.auth = firebase.auth();
    }

    render() {
        if (this.state.isConnected) {
            return (
                <ChatBox
                    handleSendMessage={this.handleSendMessage}
                    messageList={this.state.chatMessages}
                    handleDisconnect={this.handleDisconnect}
                />
            );
        } else {
            return (
                <div>
                    <h1>React firebase chat</h1>
                    <SingInForm
                        handleConnect={this.handleConnect}
                    />
                    <SingUpForm />
                </div>
            );
        }
    }
}
