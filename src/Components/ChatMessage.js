import React, { Component } from 'react'

export default class ChatMessage extends Component {
    render() {
        return (
            <tr>
                <td><strong>{this.props.msg.username}</strong></td>
                <td>{this.props.msg.message}</td>
            </tr>
        )
    }
}
