import React, { Component } from 'react'
import firebase from 'firebase'
import firebaseConfig from './firebase-config'
import uniqid from 'uniqid'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.database = null;
        this.msgDB = 'messages/';
        this.disabled = false;

        this.state = {
            username: '',
            message: '',
            roomName: '',
            chatMessages: []
        }
    }

    handleImputChange = e => {
        let { id, value } = e.target;
        this.setState({
            [id]: value
        });
    }

    handleSendMessage = e => {
        e.preventDefault();
        let id = uniqid();
        let message = {
            username: this.state.username,
            message: this.state.message
        }

        this.database
            .ref(`${this.msgDB}/${this.state.roomName}/${id}`)
            .set(message)

        this.setState({
            message: ''
        });
    }

    handleConnect = async e => {
        e.preventDefault();
        this.disabled = true;
        this.database
            .ref(`${this.msgDB}/${this.state.roomName}`)
            .on('value', snap => {
                this.setState({
                    chatMessages: this.parseSnap(snap)
                })
            })
    }

    parseSnap = (snap) => {
        let snapRaw = snap.val();
        let snapKeys = Object.keys(snapRaw);
        return snapKeys.map(k => Object.assign({ id: k }, snapRaw[k]));
    }

    componentDidMount = () => {
        firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
    }

    render() {
        return (
            <div>
                <h1>React firebase chat</h1>
                <input
                    type="text"
                    id="username"
                    value={this.state.username}
                    onChange={this.handleImputChange}
                    placeholder="Type your username"
                    disabled={this.disabled ? 'disabled': ''}
                />
                <input
                    type="text"
                    id="roomName"
                    value={this.state.roomName}
                    onChange={this.handleImputChange}
                    placeholder="Type the room name"
                    disabled={this.disabled ? 'disabled': ''}
                />
                <input
                    type="button"
                    value="Connect"
                    onClick={this.handleConnect}
                    disabled={this.disabled ? 'disabled': ''}
                />
                <section name="chat-box">
                    <table>
                        <tbody>
                            {this.state.chatMessages.map(msg => (
                                <tr key={msg.id}>
                                    <td>{msg.username}</td>
                                    <td>{msg.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <input
                        type="text"
                        id="message"
                        value={this.state.message}
                        onChange={this.handleImputChange}
                        placeholder="Type your message..." />
                    <input
                        type="button"
                        value="Send"
                        onClick={this.handleSendMessage}
                    />
                </section>
            </div>
        )
    }
}
