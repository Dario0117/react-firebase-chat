import React, { Component } from 'react';
import { Modal } from 'antd';

export default class ImgCard extends Component {
    state = {
        modal: false,
    }

    setModal = (modal) => {
        this.setState({ modal });
    }

    render() {
        let image = this.props.img;
        let fullImage = '';
        if (image.full.startsWith('http')) {
            fullImage = <a href={image.full} target="_blank">View full image</a>;
        }
        return (
            <div style={{ height: 100 }}>
                <img
                    onClick={() => this.setModal(true)}
                    src={image.thumbnail}
                    alt=""
                    style={{ cursor: 'pointer' }}
                />
                <Modal
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modal}
                    onCancel={() => this.setModal(false)}
                    footer={null}
                    width={760}
                >
                    <center>
                        <img src={image.full} style={{ width: '100%' }} alt="" />
                        {fullImage}
                    </center>
                </Modal>
            </div>
        );
    }
}
