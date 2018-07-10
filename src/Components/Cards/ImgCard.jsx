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
        return (
            <div>
                <img onClick={() => this.setModal(true)} src={image.thumbnail} alt="" />
                <Modal
                    title="Image"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.modal}
                    onCancel={() => this.setModal(false)}
                    footer={null}
                    width={760}
                >
                    <center>
                        <img src={image.full} alt="" />
                    </center>
                </Modal>
            </div>
        );
    }
}
