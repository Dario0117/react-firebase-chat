import React, { Component } from 'react'

export default class ChatMessage extends Component {
    render() {
        return (
            <div>
                <span><strong>{this.props.msg.username}</strong></span>:
                <span> {this.props.msg.message}</span>
            </div>
        )
    }
}
