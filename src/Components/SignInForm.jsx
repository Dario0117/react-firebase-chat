import React, { Component } from 'react';

export default class ConnectForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email2: '',
            password2: '',
            roomName2: '',
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
        let { email2, password2, roomName2 } = this.state;
        if (email2 && password2 && roomName2) {
            this.props.handleConnect({
                email: email2,
                password: password2,
                roomName: roomName2,
            }).catch(error => {
                console.log(error.message);
            });
        }
    }

    render() {
        return (
            <div>
                <h2>Sign in</h2>
                <input
                    type="email"
                    id="email2"
                    value={this.state.email2}
                    onChange={this.handleImputChange}
                    placeholder="Type your email"
                />
                <br />
                <input
                    type="password"
                    id="password2"
                    value={this.state.password2}
                    onChange={this.handleImputChange}
                    placeholder="Type the password"
                />
                <br />
                <input
                    type="text"
                    id="roomName2"
                    value={this.state.roomName2}
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
