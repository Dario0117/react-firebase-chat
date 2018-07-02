import React, { Component } from 'react'
import ExternalChatMessage from './ExternalChatMessage'

export default class ChatMessage extends Component {
    render() {
        let external = '';
        let image = '';
        if (this.props.msg.external) {
            external = <ExternalChatMessage url={this.props.msg.external.url} />
        }
        if (this.props.msg.image) {
            // TODO: Make this a component
            image = <img src={this.props.msg.image} alt="" />
        }
        return (
            <div>
                <span><strong>{this.props.msg.username}</strong></span>:
                <span> {this.props.msg.message}</span>
                {external}
                <br/>
                {image}
            </div>
        )
    }
}
