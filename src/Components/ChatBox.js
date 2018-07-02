import React, { Component } from 'react'
import ChatMessageList from './ChatMessageList'
import { imageASBase64 } from '../Utils/ImgFromClipboard'

export default class ChatBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: '',
            cardType: '',
            cardSrc: ''
        }
    }

    handleImputChange = e => {
        let { id, value } = e.target;
        this.setState({
            [id]: value
        });
    }

    handleSendMessage = e => {
        e.preventDefault();
        if (this.state.message) {
            this.props.handleSendMessage(this.state.message);
            this.setState({
                message: ''
            })
        }
    }

    handdleInputPaste = e => {
        imageASBase64(e, (res) => {
            this.setState({
                cardType: 'img',
                cardSrc: res,
            })
        })
    }

    render() {
        let card = '';
        switch (this.state.cardType) {
            case 'img':
                card = <img src={this.state.cardSrc} alt="" />
                break;

            default:
                break;
        }
        return (
            <section name="chat-box">
                <ChatMessageList messageList={this.props.messageList} />
                <input
                    type="text"
                    id="message"
                    value={this.state.message}
                    onChange={this.handleImputChange}
                    onPaste={this.handdleInputPaste}
                    placeholder="Type your message..." />
                <input
                    type="button"
                    value="Send"
                    onClick={this.handleSendMessage}
                />
                <br/>
                {card}
            </section>
        )
    }
}
