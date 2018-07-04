import React, { Component } from 'react'
import UrlFromInput from '../Utils/UrlFromInput'
import UrlCard from './Cards/UrlCard'
import ImgCard from './Cards/ImgCard'
import AttachmentLink from '../DataStructures/Attachments/Link'
import UrlMeta from '../Utils/UrlMeta'
import { imageASBase64 } from '../Utils/ImgFromClipboard'
import AttachmentImage from '../DataStructures/Attachments/Image'

export default class MessageInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            attachment: '',
            attachmentType: '',
        };
        this.showUrlCard = true;
    }

    getMetaFromURL = async url => {
        let { title, description, image } = await UrlMeta(url);
        return {
            title,
            description,
            image,
            url
        };
    }

    addUrlAttachment = value => {
        let url = UrlFromInput(value);
        if (url && this.showUrlCard) {
            this.getMetaFromURL(url)
                .then(meta => {
                    let link = new AttachmentLink();
                    link.description = meta.description;
                    link.image = meta.image;
                    link.title = meta.title;
                    link.url = meta.url;
                    this.setState({
                        attachment: link,
                        attachmentType: 'link',
                    })
                    this.showUrlCard = false;
                });
        }
    }

    handleImputChange = e => {
        let { id, value } = e.target;
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
            this.addUrlAttachment(value);
        }
        let newState = {
            [id]: value
        }

        if (!value) {
            newState.attachment = '';
            newState.attachmentType = '';
            this.showUrlCard = true;
        }

        this.setState(newState);
    }

    handleInputPaste = e => {
        let value = e.clipboardData.getData('Text');
        if (e.clipboardData.items[0].type === 'text/plain') {
            this.addUrlAttachment(value);
        } else {
            imageASBase64(e, image => {
                let img = new AttachmentImage();
                img.full = image;
                img.thumbnail = image;
                this.setState({
                    attachment: img,
                    attachmentType: 'img',
                })
            })
        }
    }

    handleSendMessage = e => {
        e.preventDefault();
        if (this.state.message || this.state.attachmentType) {
            this.props.handleSendMessage(this.state);
            this.setState({
                message: '',
                attachment: '',
                attachmentType: '',
            })
        }
    }

    render() {
        let card = '';
        switch (this.state.attachmentType) {
            case 'img':
                card = <ImgCard img={this.state.attachment} />
                break;

            case 'link':
                card = <UrlCard link={this.state.attachment} />
                break;
            default:
                break;
        }
        return (
            <div>
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
            </div>
        )
    }
}
