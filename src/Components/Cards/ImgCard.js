import React, { Component } from 'react'

export default class ExternalChatMessage extends Component {

    render() {
        return (
            <div>
                <img src={this.props.src} alt="" />
            </div>
        )
    }
}
