import React, { Component } from 'react'
import UrlMeta from '../../Utils/UrlMeta'

export default class ExternalChatMessage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            url: this.props.url,
            image: '',
        }
    }

    componentDidMount = async () => {
        let {
            title,
            description,
            image
        } = await UrlMeta(this.state.url);
        this.setState({
            title,
            description,
            image,
        });
    }

    render() {
        if (this.state.title) {
            return (
                <div>
                    <span>{this.state.title}</span><br />
                    <span>{this.state.description}</span><br />
                    <span>{this.state.url}</span><br />
                    <img src={this.state.image} alt="Not found" height="80" />
                </div>
            )
        } else {
            return ''
        }
    }
}
