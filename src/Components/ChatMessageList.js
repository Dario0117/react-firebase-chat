import React, { Component } from 'react'

export default class ChatMessageList extends Component {
    render() {
        return (
            <table>
                <tbody>
                    {this.props.messageList.map(msg => (
                        <tr key={msg.id}>
                            <td>{msg.username}</td>
                            <td>{msg.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}
