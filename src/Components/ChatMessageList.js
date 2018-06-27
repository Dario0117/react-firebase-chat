import React, { Component } from 'react'
import ChatMessage from './ChatMessage'

export default class ChatMessageList extends Component {
    render() {
        return (
            <table>
                <tbody>
                    {this.props.messageList.map(msg => (
                        <ChatMessage key={msg.id} msg={msg} />
                    ))}
                </tbody>
            </table>
        )
    }
}
