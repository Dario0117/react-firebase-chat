import React, { Component } from 'react'

export default class UrlCard extends Component {

    render() {
        let link = this.props.link;
        let host = new window.URL(link.url);
        return (
            <div>
                <span>{link.title}</span><br />
                <span>{link.description}</span><br />
                <span>{`${host.protocol}//${host.hostname}`}</span><br />
                <img src={link.image} alt="Not found" height="80" />
            </div>
        )
    }
}
