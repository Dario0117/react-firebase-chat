import React, { Component } from 'react';

export default class SingUpForm extends Component {
    render() {
        return (
            <div>
                <h2>Sing up</h2>
                <input
                    type="text"
                    id="email"
                    // value={this.state.email}
                    // onChange={this.handleImputChange}
                    placeholder="Type your email"
                />
                <br />
                <input
                    type="password"
                    id="password"
                    // value={this.state.password}
                    // onChange={this.handleImputChange}
                    placeholder="Type your password"
                />
                <br />
                <input
                    type="text"
                    id="username2"
                    // value={this.state.username}
                    // onChange={this.handleImputChange}
                    placeholder="Type your username"
                />
                <br />
                <input
                    type="button"
                    value="Sing up"
                // onClick={this.handleConnectClick}
                />
            </div>
        )
    }
}
