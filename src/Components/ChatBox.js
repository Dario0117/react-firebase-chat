import React, { Component } from 'react'
import ChatMessageList from './ChatMessageList'
import { imageASBase64 } from '../Utils/ImgFromClipboard'
import UrlFromInput from '../Utils/UrlFromInput'
import UrlCard from './Cards/UrlCard'
import ImgCard from './Cards/ImgCard'

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
        let url = '';
        /**
         * When user type url, it only accept one character,
         * ex: www.g instead of www.google.com,
         * to fix it, i check if the last character of
         * the imput is a space, but, another "problem"
         * appears, the space is strictly neccessary
         * to process url on the imput :c,
         * when the user paste an url, can not be recognized,
         * to fix it, i handle it on handleInputPaste function.
         */
        if (value[value.length - 1] === ' ') {
            url = UrlFromInput(value);
        }
        let newState = {
            [id]: value
        }

        if (url && this.showUrlCard) {
            newState.cardType = 'url';
            newState.cardSrc = url;
            this.showUrlCard = false;
        }

        if (!value) {
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

    handleInputPaste = e => {
        let value = e.clipboardData.getData('Text');
        if (e.clipboardData.items[0].type === 'text/plain') {
            let url = UrlFromInput(value);
            if (url && this.showUrlCard) {
                this.setState({
                    cardType: 'url',
                    cardSrc: url,
                })
                this.showUrlCard = false;
            }
        } else {
            imageASBase64(e, image => {
                this.setState({
                    cardType: 'img',
                    cardSrc: image,
                })
            })
        }
    }

    render() {
        let card = '';
        switch (this.state.cardType) {
            case 'img':
                card = <ImgCard src={this.state.cardSrc} />
                break;

            case 'url':
                card = <UrlCard url={this.state.cardSrc} />
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
                    onPaste={this.handleInputPaste}
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
