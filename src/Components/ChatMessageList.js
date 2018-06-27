import React, { Component } from 'react'
import ChatMessage from './ChatMessage'

export default class ChatMessageList extends Component {
    render() {
        return (
            <div>
                {this.props.messageList.map(msg => (
                    <ChatMessage key={msg.id} msg={msg} />
                ))}
            </div>
        )
    }
}
