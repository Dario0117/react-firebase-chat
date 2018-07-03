import React, { Component } from 'react'
import UrlCard from './Cards/UrlCard'
import ImgCard from './Cards/ImgCard'

export default class ChatMessage extends Component {
    render() {
        let card = '';
        if (this.props.msg.external) {
            card = <UrlCard url={this.props.msg.external.url} />
        }
        if (this.props.msg.image) {
            card = <ImgCard src={this.props.msg.image} />
        }
        return (
            <div>
                <span><strong>{this.props.msg.username}</strong></span>:
                <span> {this.props.msg.message}</span>
                {card}
            </div>
        )
    }
}
