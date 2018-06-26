import React, { Component } from 'react'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            message: ''
        }
    }

    handleImputChange = e => {
        let { id, value } = e.target;
        this.setState({
            [id]: value
        });
    }

    render() {
        return (
            <div>
                <h1>React firebase chat</h1>
                <section name="chat-box">
                    <table>
                        <tbody>
                            <tr>
                                <td>user1</td>
                                <td>msg</td>
                            </tr>
                            <tr>
                                <td>user1</td>
                                <td>msg</td>
                            </tr>
                            <tr>
                                <td>user2</td>
                                <td>msg</td>
                            </tr>
                            <tr>
                                <td>user1</td>
                                <td>msg</td>
                            </tr>
                            <tr>
                                <td>user2</td>
                                <td>msg</td>
                            </tr>
                        </tbody>
                    </table>
                    <input
                        type="text"
                        id="username"
                        value={this.state.username}
                        onChange={this.handleImputChange}
                        placeholder="Type your username"
                    />
                    <input
                        type="text"
                        id="message"
                        value={this.state.message}
                        onChange={this.handleImputChange}
                        placeholder="Type your message..." />
                    <input type="button" value="Send" />
                </section>
            </div>
        )
    }
}
