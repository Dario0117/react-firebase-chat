import React, { Component } from 'react'
import ExternalChatMessage from './ExternalChatMessage'

export default class ChatMessage extends Component {
    render() {
        let external = ''
        if (this.props.msg.external) {
            external = <ExternalChatMessage url={this.props.msg.external.url}/>
        }
        return (
            <div>
                <span><strong>{this.props.msg.username}</strong></span>:
                <span> {this.props.msg.message}</span>
                {external}
            </div>
        )
    }
}
