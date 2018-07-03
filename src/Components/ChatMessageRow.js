import React, { Component } from 'react'
import UrlCard from './Cards/UrlCard'
import ImgCard from './Cards/ImgCard'

export default class ChatMessage extends Component {
    render() {
        let external = '';
        let image = '';
        if (this.props.msg.external) {
            external = <UrlCard url={this.props.msg.external.url} />
        }
        if (this.props.msg.image) {
            image = <ImgCard src={this.props.msg.image} />
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
