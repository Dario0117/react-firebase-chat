import React, { Component } from 'react';

import MessageRow from './MessageRow';
import './MessageList.css';


export default class MessageList extends Component {

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate(nextProps) {
        if (this.props.messageList.length !== nextProps.messageList.length) {
            this.scrollToBottom();
        }
    }
    render() {
        return (
            <div className="msg-list">
                {this.props.messageList.map(msg => (
                    <MessageRow key={msg.id} msg={msg} />
                ))}
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        );
    }
}
