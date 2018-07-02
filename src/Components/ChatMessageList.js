import React, { Component } from 'react'
import ChatMessageRow from './ChatMessageRow'

export default class ChatMessageList extends Component {
    render() {
        return (
            <div>
                {this.props.messageList.map(msg => (
                    <ChatMessageRow key={msg.id} msg={msg} />
                ))}
            </div>
        )
    }
}
