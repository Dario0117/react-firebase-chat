import React, { Component } from 'react'
import UrlCard from './Cards/UrlCard'
import ImgCard from './Cards/ImgCard'
import VidCard from './Cards/VidCard'

export default class ChatMessage extends Component {
    render() {
        let card = '';
        let msg = this.props.msg;
        if (msg.attachments) {
            if (msg.attachments.image) {
                card = <ImgCard img={msg.attachments.image} />
            } else if (msg.attachments.link) {
                card = <UrlCard link={msg.attachments.link} />
            } else if (msg.attachments.video) {
                card = <VidCard vid={msg.attachments.video} />
            }
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
