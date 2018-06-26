import React, { Component } from 'react'

export default class App extends Component {
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
                    <input type="text" id="username" placeholder="Type your username"/>
                    <input type="text" id="message" placeholder="Type your message..." />
                    <input type="button" value="Send" />
                </section>
            </div>
        )
    }
}
