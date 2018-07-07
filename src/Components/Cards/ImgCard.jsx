import React, { Component } from 'react';

export default class ImgCard extends Component {

    render() {
        let image = this.props.img;
        return (
            <div>
                <img src={image.full} alt="" />
            </div>
        );
    }
}
