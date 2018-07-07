import React, { Component } from 'react';

export default class ConnectForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            roomName: '',
            password: '',
        };

        this.handleImputChange = this.handleImputChange.bind(this);
        this.handleConnectClick = this.handleConnectClick.bind(this);
    }

    handleImputChange(e) {
        let { id, value } = e.target;
        this.setState({
            [id]: value
        });
    }

    handleConnectClick(e) {
        e.preventDefault();
        if (this.state.username && this.state.roomName) {
            this.props.handleConnect({
                username: this.state.username,
                roomName: this.state.roomName,
            });
        }
    }

    render() {
        return (
            <div>
                <h2>Sing in</h2>
                <input
                    type="text"
                    id="username"
                    value={this.state.username}
                    onChange={this.handleImputChange}
                    placeholder="Type your username"
                />
                <br />
                <input
                    type="text"
                    id="roomName"
                    value={this.state.roomName}
                    onChange={this.handleImputChange}
                    placeholder="Type the room name"
                />
                <br />
                <input
                    type="button"
                    value="Connect"
                    onClick={this.handleConnectClick}
                />
            </div>
        );
    }
}
