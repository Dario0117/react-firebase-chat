import React, { Component } from 'react';
import UrlFromInput from '../Utils/UrlFromInput';
import UrlCard from './Cards/UrlCard';
import ImgCard from './Cards/ImgCard';
import VidCard from './Cards/VidCard';
import UrlMeta from '../Utils/UrlMeta';
import Clipboard from '../Utils/ImgFromClipboard';
import FileChooser from '../Utils/ImgFromFile';
import AttachmentLink from '../DataStructures/Attachments/Link';
import AttachmentImage from '../DataStructures/Attachments/Image';
import {
    ATTACHMENT_TYPE_IMAGE,
    ATTACHMENT_TYPE_LINK,
    ATTACHMENT_TYPE_VIDEO,
} from '../DataStructures/Constants';

export default class MessageInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            attachment: '',
            attachmentType: '',
        };
        this.showUrlCard = true;

        this.addUrlAttachment = this.addUrlAttachment.bind(this);
        this.addImgAttachment = this.addImgAttachment.bind(this);
        this.addVidAttachment = this.addVidAttachment.bind(this);
        this.handleFileChooser = this.handleFileChooser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputPaste = this.handleInputPaste.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    async getMetaFromURL(url) {
        let { title, description, image } = await UrlMeta(url);
        return {
            title,
            description,
            image,
            url,
        };
    }

    addUrlAttachment(value) {
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
                        attachmentType: ATTACHMENT_TYPE_LINK,
                    })
                    this.showUrlCard = false;
                });
        }
    }

    addImgAttachment(img64) {
        let img = new AttachmentImage();
        img.full = img64;
        img.thumbnail = img64;
        this.setState({
            attachment: img,
            attachmentType: ATTACHMENT_TYPE_IMAGE,
        });
    }

    addVidAttachment(video) {
        this.setState({
            attachment: video,
            attachmentType: ATTACHMENT_TYPE_VIDEO,
        });
    }

    handleFileChooser(e) {
        let files = e.target.files;
        if (files) {
            if (files[0].type.indexOf('image') !== -1) {
                FileChooser.imageAsBase64(e.target.files[0])
                    .then(this.addImgAttachment);
            } else if (files[0].type === 'video/mp4') {
                this.addVidAttachment(files[0]);
            }
        }
    }

    handleInputChange(e) {
        let { id, value } = e.target;
        /**
         * When user type url, it only accept one character,
         * ex: www.g instead of www.google.com,
         * to fix it, i check if the last character of
         * the input is a space, but, another "problem"
         * appears, the space is strictly neccessary
         * to process url on the input :c,
         * when the user paste an url, can not be recognized,
         * to fix it, i handle it on handleInputPaste function.
         */
        if (value[value.length - 1] === ' ') {
            this.addUrlAttachment(value);
        }

        let newState = {
            [id]: value,
        }

        if (!value) {
            newState.attachment = '';
            newState.attachmentType = '';
            this.showUrlCard = true;
        }

        this.setState(newState);
    }

    handleInputPaste(e) {
        let value = e.clipboardData.getData('Text');
        if (e.clipboardData.items[0].type === 'text/plain') {
            this.addUrlAttachment(value);
        } else {
            Clipboard.imageASBase64(e, this.addImgAttachment);
        }
    }

    handleSendMessage(e) {
        e.preventDefault();
        if (this.state.message || this.state.attachmentType) {
            this.props.handleSendMessage(this.state);
            this.setState({
                message: '',
                attachment: '',
                attachmentType: '',
            });
        }
    }

    render() {
        let card = '';
        switch (this.state.attachmentType) {
            case ATTACHMENT_TYPE_IMAGE: {
                card = <ImgCard img={this.state.attachment} />
                break;
            }
            case ATTACHMENT_TYPE_LINK: {
                card = <UrlCard link={this.state.attachment} />
                break;
            }
            case ATTACHMENT_TYPE_VIDEO: {
                card = <VidCard vid={this.state.attachment} />
                break;
            }
            default: {
                break;
            }
        }
        return (
            <div>
                <input
                    type="text"
                    id="message"
                    value={this.state.message}
                    onChange={this.handleInputChange}
                    onPaste={this.handleInputPaste}
                    placeholder="Type your message..." />
                <input
                    type="button"
                    value="Send"
                    onClick={this.handleSendMessage}
                />
                <input
                    type="file"
                    id="attachment"
                    onChange={this.handleFileChooser}
                    accept="image/*, video/mp4"
                />
                <br />
                {card}
            </div>
        );
    }
}
