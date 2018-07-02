import React, { Component } from 'react'
import ChatMessageList from './ChatMessageList'
import { imageASBase64 } from '../Utils/ImgFromClipboard'
import UrlFromInput from '../Utils/UrlFromInput'
import ExternalChatMessage from './ExternalChatMessage'

export default class ChatBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: '',
            cardType: '',
            cardSrc: '',
        }

        this.showUrlCard = true;
    }

    handleImputChange = e => {
        let { id, value } = e.target;
        let url = UrlFromInput(value);
        let newState = {
            [id]: value
        }

        if (url && this.showUrlCard) {
            newState.cardType = 'url';
            newState.cardSrc = url;
            this.showUrlCard = false;
        }

        if(!value) {
            newState.cardType = '';
            newState.cardSrc = '';
            this.showUrlCard = true;
        }

        this.setState(newState);
    }

    handleSendMessage = e => {
        e.preventDefault();
        if (this.state.message || this.state.cardType) {
            this.props.handleSendMessage(this.state);
            this.setState({
                message: '',
                cardType: '',
                cardSrc: '',
            })
        }
    }

    handdleInputPaste = e => {
        imageASBase64(e, image => {
            this.setState({
                cardType: 'img',
                cardSrc: image,
            })
        })
    }

    render() {
        let card = '';
        switch (this.state.cardType) {
            case 'img':
                card = <img src={this.state.cardSrc} alt="" />
                break;

            case 'url':
                card = <ExternalChatMessage url={this.state.cardSrc} />
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
                <br />
                {card}
            </section>
        )
    }
}
