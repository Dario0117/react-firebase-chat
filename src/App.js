import React, { Component } from 'react'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            message: '',
            chatMessages: [
                {
                    username: 'user1',
                    message: 'msg'
                }, {
                    username: 'user1',
                    message: 'msg'
                }, {
                    username: 'user2',
                    message: 'msg'
                }, {
                    username: 'user1',
                    message: 'msg'
                },
            ]
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
        this.setState({
            chatMessages: this.state.chatMessages.concat({
                username: this.state.username,
                message: this.state.message
            }),
            message: ''
        });
    }

    render() {
        return (
            <div>
                <h1>React firebase chat</h1>
                <section name="chat-box">
                    <table>
                        <tbody>
                            {this.state.chatMessages.map((msg, idx) => (
                                <tr key={idx}>
                                    <td>{msg.username}</td>
                                    <td>{msg.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <input
                        type="text"
                        id="username"
                        value={this.state.username}
                        onChange={this.handleImputChange}
                        placeholder="Type your username"
                    />
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
