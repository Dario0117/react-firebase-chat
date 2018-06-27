import React, { Component } from 'react'
import ChatMessageList from './ChatMessageList'

export default class ChatBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: '',
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
        this.props.handleSendMessage(this.state.message);
        this.setState({
            message: ''
        })
    }

    render() {
        return (
            <section name="chat-box">
                <ChatMessageList messageList={this.props.messageList} />
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
        )
    }
}
