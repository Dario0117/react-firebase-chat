import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import moment from 'moment';
import firebaseConfig from '../firebase-config';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
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

import Title from './Utils/Title';

import {
    Layout,
    Icon,
    Row,
    Col,
    Card,
} from 'antd';

const { Header, Footer, Content } = Layout;

export default class App extends Component {
    constructor(props) {
        super(props);

        this.database = null;
        this.CHATROOMS = 'chatrooms/';
        this.MESSAGES = 'messages/';
        this.USERS = 'users/';

        this.storage = null;
        this.auth = null;

        this.messagesRef = null;
        this.userOnRoomRef = null;

        this.lastTimeMouseMove = moment().valueOf();

        this.state = {
            chatMessages: [],
            roomName: '',
            username: '',
            isConnected: false,
            users: [],
        };

        this.handleConnect = this.handleConnect.bind(this);
        this.handleDisconnect = this.handleDisconnect.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.uploadContent = this.uploadContent.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.fetchMessages = this.fetchMessages.bind(this);
        this.listenNewMessages = this.listenNewMessages.bind(this);
        this.updateOnlineStatus = this.updateOnlineStatus.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.updateOnlineUsers = this.updateOnlineUsers.bind(this);
    }

    getMessageFromSnap(snap) {
        let snapRaw = snap.val();
        let msg = new Message();
        msg.id = snap.key;
        msg.message = snapRaw.message;
        msg.username = snapRaw.username;
        let attachments = snapRaw.attachments;
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
    }

    getUsersFromSnap(snap) {
        let snapRaw = snap.val();
        let snapKeys = Object.keys(snapRaw);

        return snapKeys.map(k => {
            let user = {
                key: k,
                time: snapRaw[k].time,
                name: snapRaw[k].username,
            };

            return user;
        });
    }

    fetchMessages(user, roomName) {
        this.messagesRef = this.database
            .ref(`${this.CHATROOMS}/${roomName}/${this.MESSAGES}`);
        this.setState({
            roomName,
            username: user.val().name,
            isConnected: true,
        });
        this.listenNewMessages();
    }

    listenNewMessages() {
        this.messagesRef
            .on('child_added', snap => {
                let newMessage = this.getMessageFromSnap(snap);
                let chatMessages = this.state.chatMessages.concat(newMessage);
                this.setState({
                    chatMessages,
                });
            })
    }

    handleSignUp({ email, password, name, roomName }) {
        return new Promise((resolve, reject) => {
            this.auth.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    let { uid, email } = this.auth.currentUser;
                    this.database
                        .ref(`${this.USERS}/${uid}`)
                        .set({
                            email,
                            name,
                        });
                    this.handleConnect({
                        roomName,
                        password,
                        email,
                    });
                    resolve();
                })
                .catch(reject)
        });
    }

    updateOnlineStatus() {
        this.userOnRoomRef
            .set({
                time: moment().valueOf(),
                username: this.state.username,
            });
    }

    updateOnlineUsers(users) {
        let snapUsers = this.getUsersFromSnap(users);
        let msBetweenConnections = 2000;
        let newUsers = snapUsers.map(nUser => {
            let u = {
                time: moment().valueOf(),
                key: nUser.key,
                status: false,
                name: nUser.name,
            }

            if ((u.time - nUser.time) <= msBetweenConnections) {
                u.status = true;
            }

            return u;
        });
        this.setState({
            users: newUsers.sort(user => user.status === false),
        });
    }

    handleConnect({ roomName, email, password }) {
        return new Promise((resolve, reject) => {
            this.auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    let { uid } = this.auth.currentUser;
                    this.database
                        .ref(`${this.USERS}/${uid}`)
                        .once('value', user => this.fetchMessages(user, roomName));

                    this.userOnRoomRef = this.database
                        .ref(`${this.CHATROOMS}/${roomName}/${this.USERS}/${uid}`);

                    this.database
                        .ref(`${this.CHATROOMS}/${roomName}/${this.USERS}`)
                        .on('value', this.updateOnlineUsers);

                    this.updateOnlineStatus();
                    resolve();
                })
                .catch(reject);
        });
    }

    handleDisconnect() {
        this.database
            .ref(`${this.CHATROOMS}/${this.state.roomName}/${this.MESSAGES}`)
            .off();
        this.auth.signOut();
        this.setState({
            isConnected: false,
            chatMessages: [],
            users: [],
        });
    }

    async handleSendMessage(input) {
        if (this.state.isConnected) {
            this.updateOnlineStatus();
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
                    try {
                        url = await this.uploadContent({
                            name: msgRef.key,
                            content: input.attachment,
                            type: input.attachmentType,
                        });
                    } catch (error) {
                        console.log(error);
                        return;
                    }
                    let img = new AttachmentImage();
                    img.full = url.full;
                    img.thumbnail = url.thumbnail;
                    msg.addImage(img);
                    break;
                }
                case ATTACHMENT_TYPE_LINK: {
                    msg.addLink(input.attachment);
                    break;
                }
                case ATTACHMENT_TYPE_VIDEO: {
                    try {
                        url = await this.uploadContent({
                            name: msgRef.key,
                            content: input.attachment,
                            type: input.attachmentType,
                        });
                    } catch (error) {
                        console.log(error);
                        return;
                    }
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
                        let fullRef = this.storage
                            .ref(`${this.CHATROOMS}/${this.state.roomName}/${file.type}`)
                            .child(`${file.name}.full`);

                        let thumbRef = this.storage
                            .ref(`${this.CHATROOMS}/${this.state.roomName}/${file.type}`)
                            .child(`${file.name}.thumb`);

                        Promise.all([
                            fullRef.putString(file.content.full, 'data_url'),
                            thumbRef.putString(file.content.thumbnail, 'data_url'),
                        ]).then(() => {
                            Promise.all([
                                fullRef.getDownloadURL(),
                                thumbRef.getDownloadURL(),
                            ]).then((urls) => {
                                resolve({
                                    full: urls[0],
                                    thumbnail: urls[1],
                                });
                            }).catch(reject);
                        }).catch(reject);
                        break;
                    }
                    case ATTACHMENT_TYPE_VIDEO: {
                        fileRef.put(file.content)
                            .then(() => {
                                fileRef.getDownloadURL()
                                    .then(resolve)
                                    .catch(reject)
                            })
                            .catch(reject);
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

    handleMouseMove() {
        let now = moment().valueOf();
        let msToAction = 3000;
        if ((now - this.lastTimeMouseMove) >= msToAction) {
            this.lastTimeMouseMove = now;
            this.updateOnlineStatus();
        }
    }

    render() {
        let content = '';
        if (this.state.isConnected) {
            content = (
                <Row
                    type="flex"
                    justify="space-around"
                    onMouseMove={this.handleMouseMove}
                >
                    <ChatBox
                        handleSendMessage={this.handleSendMessage}
                        messageList={this.state.chatMessages}
                        handleDisconnect={this.handleDisconnect}
                        users={this.state.users}
                    />
                </Row>
            );
        } else {
            content = (
                <Row
                    type="flex"
                    justify="space-around"
                    align="middle"
                >
                    <Col order={1} span={8}>
                        <Card title={<Title text="Sign in" />}>
                            <SignInForm
                                handleConnect={this.handleConnect}
                            />
                        </Card>
                    </Col>
                    <Col order={2}>
                        <h2>or</h2>
                    </Col>
                    <Col order={3} span={8}>
                        <Card title={<Title text="Sign out" />}>
                            <SignUpForm
                                handleSignUp={this.handleSignUp}
                            />
                        </Card>
                    </Col>
                </Row>
            );
        }

        return (
            <Layout
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute'
                }}
            >
                <Header style={{ textAlign: 'center' }}>
                    <h1 style={{ color: '#fff' }}>React firebase chat</h1>
                </Header>
                <Content style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    {content}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    React firebase chat ©2018 Created by <a href="https://github.com/Dario0117"><Icon type="github" /> Dario0117</a>
                </Footer>
            </Layout>
        );
    }
}
