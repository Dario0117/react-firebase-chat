import React, { Component } from 'react'

export default class ExternalChatMessage extends Component {

    render() {
        let link = this.props.link;
        return (
            <div>
                <span>{link.title}</span><br />
                <span>{link.description}</span><br />
                <span>{link.url}</span><br />
                <img src={link.image} alt="Not found" height="80" />
            </div>
        )
    }
}
