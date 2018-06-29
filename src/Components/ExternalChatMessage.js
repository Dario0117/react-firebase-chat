import React, { Component } from 'react'

export default class ExternalChatMessage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: '',
            url: this.props.url,
            image: '',
        }
    }

    componentDidMount = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://cors-anywhere.herokuapp.com/${this.state.url}`, true);
        xhr.addEventListener('load', e => {
            console.log(e.target.response);
        })
        xhr.send();
    }

    render() {
        if (this.state.title) {
            return (
                <div>
                    <span>{this.state.title}</span><br />
                    <span>{this.state.description}</span><br />
                    <span>{this.state.url}</span><br />
                    <img src={this.state.image} alt="Not found" />
                </div>
            )
        } else {
            return ''
        }
    }
}
