import React, { Component } from 'react';
import resizeImage from 'resize-image';
import { Row, Col, Input, Button, Icon } from 'antd';

import UrlFromInput from '../Utils/UrlFromInput';
import UrlCard from './Cards/UrlCard';
import ImgCard from './Cards/ImgCard';
import VidCard from './Cards/VidCard';
import Loading from './Cards/Loading';
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
import './MessageInput.css';

const { TextArea } = Input;

export default class MessageInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            attachment: '',
            attachmentType: '',
            loadingCard: false,
        };
        // flag for avoid re-render card on multiple times link detected 
        this.showUrlCard = true;
        this.fileChooserElement = null;

        this.addUrlAttachment = this.addUrlAttachment.bind(this);
        this.addImgAttachment = this.addImgAttachment.bind(this);
        this.addVidAttachment = this.addVidAttachment.bind(this);
        this.handleFileChooser = this.handleFileChooser.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputPaste = this.handleInputPaste.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleFileChooserButton = this.handleFileChooserButton.bind(this);
        this.handleRemoveAttachment = this.handleRemoveAttachment.bind(this);
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
            this.setState({
                loadingCard: true,
            });
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
                        loadingCard: false,
                    })
                    this.showUrlCard = false;
                });
        }
    }

    addImgAttachment(img64) {
        let img = new AttachmentImage();
        img.full = img64;
        let i = new window.Image();
        i.onload = () => {
            let data = resizeImage.resize(i, 100, 100, resizeImage.PNG);
            img.thumbnail = data;
            this.setState({
                attachment: img,
                attachmentType: ATTACHMENT_TYPE_IMAGE,
            });
        };
        i.src = img64;
    }

    addVidAttachment(video) {
        this.setState({
            attachment: video,
            attachmentType: ATTACHMENT_TYPE_VIDEO,
        });
    }

    handleFileChooserButton() {
        this.fileChooserElement.click();
    }

    handleFileChooser(e) {
        let files = e.target.files;
        if (files.length > 0) {
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
            newState.loadingCard = false;
            this.showUrlCard = true;
        }

        this.setState(newState);
    }

    handleInputPaste(e) {
        let value = e.clipboardData.getData('Text');
        if (value) {
            this.addUrlAttachment(value);
        } else {
            Clipboard.imageASBase64(e, this.addImgAttachment);
        }
    }

    handleSendMessage(e) {
        e.preventDefault();
        if (this.state.message || this.state.attachmentType) {
            this.props.handleSendMessage(this.state);
            this.showUrlCard = true;
            this.setState({
                message: '',
                attachment: '',
                attachmentType: '',
                loadingCard: false,
            });
        }
    }

    handleRemoveAttachment(e) {
        e.preventDefault();
        this.showUrlCard = true;
        this.setState({
            attachment: '',
            attachmentType: '',
            loadingCard: false,
        })
    }

    render() {
        let card = '';
        let display = 'block';
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
                display = 'none';
                break;
            }
        }

        if (this.state.loadingCard) {
            display = 'block';
            card = <Loading />;
        } 

        let icon = '';
        if (!this.state.loadingCard) {
            icon = (
                <Icon
                    type="close-square"
                    onClick={this.handleRemoveAttachment}
                    className="card-close-icon"
                />
            )
        }

        let wrapper = (
            <div
                style={{
                    display,
                    position: 'relative',
                }}
            >
                {card}
                {icon}
            </div>
        );
        return (
            <React.Fragment>
                {wrapper}
                <div>
                    <Row gutter={2}>
                        <Col span={17}>
                            <TextArea
                                id="message"
                                value={this.state.message}
                                placeholder="Type your message..."
                                style={{ resize: 'none' }}
                                autosize={{ minRows: 1, maxRows: 2 }}
                                onChange={this.handleInputChange}
                                onPaste={this.handleInputPaste}
                                onPressEnter={this.handleSendMessage}
                            />
                        </Col>
                        <Col span={5}>
                            <Button
                                type="primary"
                                icon="enter"
                                style={{ width: '100%' }}
                                onClick={this.handleSendMessage}
                                ghost
                            >
                                Send
                        </Button>
                        </Col>
                        <Col span={2}>
                            <Button
                                type="primary"
                                icon="upload"
                                style={{ width: '100%' }}
                                onClick={this.handleFileChooserButton}
                                ghost
                            />
                            <input
                                type="file"
                                id="attachment"
                                style={{ display: 'none' }}
                                ref={input => this.fileChooserElement = input}
                                onChange={this.handleFileChooser}
                                accept="image/*, video/mp4"
                            />
                        </Col>
                    </Row>
                </div >
            </React.Fragment>
        );
    }
}
