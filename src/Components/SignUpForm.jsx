import React, { Component } from 'react';

export default class SingUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            roomName: '',
        };

        this.handleImputChange = this.handleImputChange.bind(this);
        this.handleSignUpClick = this.handleSignUpClick.bind(this);
    }

    handleImputChange(e) {
        let { id, value } = e.target;
        this.setState({
            [id]: value
        });
    }

    handleSignUpClick(e) {
        e.preventDefault();
        let { email, password, name, roomName } = this.state;
        if (email && password && name) {
            this.props.handleSignUp({
                email,
                password,
                name,
                roomName,
            }).catch(error => {
                console.log(error.message);
            });
        }
    }

    render() {
        return (
            <div>
                <h2>Sing up</h2>
                <input
                    type="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleImputChange}
                    placeholder="Type your email"
                />
                <br />
                <input
                    type="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleImputChange}
                    placeholder="Type your password"
                />
                <br />
                <input
                    type="text"
                    id="name"
                    value={this.state.name}
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
                    value="Sing up"
                    onClick={this.handleSignUpClick}
                />
            </div>
        )
    }
}
