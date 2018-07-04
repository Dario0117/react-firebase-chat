import React, { Component } from 'react'
import MessageRow from './MessageRow'

export default class ChatMessageList extends Component {
    render() {
        return (
            <div>
                {this.props.messageList.map(msg => (
                    <MessageRow key={msg.id} msg={msg} />
                ))}
            </div>
        )
    }
}
