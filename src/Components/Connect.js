import React, { Component } from 'react'

export default class Connect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            roomName: '',
            disabled: false,
        }
    }
    
    handleImputChange = e => {
        let { id, value } = e.target;
        this.setState({
            [id]: value
        });
    }

    handleConnectClick = e => {
        e.preventDefault();
        this.setState({
            disabled: true
        })
        this.props.handleConnect(Object.assign({}, this.state))
    }

    handleDisconnectClick = e => {
        e.preventDefault();
        this.setState({
            disabled: false
        })
        this.props.handleDisconnect()
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    id="username"
                    value={this.state.username}
                    onChange={this.handleImputChange}
                    placeholder="Type your username"
                    disabled={this.state.disabled ? 'disabled' : ''}
                />
                <input
                    type="text"
                    id="roomName"
                    value={this.state.roomName}
                    onChange={this.handleImputChange}
                    placeholder="Type the room name"
                    disabled={this.state.disabled ? 'disabled' : ''}
                />
                <input
                    type="button"
                    value="Connect"
                    onClick={this.handleConnectClick}
                    disabled={this.state.disabled ? 'disabled' : ''}
                />
                <input
                    type="button"
                    value="Disconnect"
                    onClick={this.handleDisconnectClick}
                />
            </div>
        )
    }
}
