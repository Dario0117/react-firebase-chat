import React, { Component } from 'react';
import icon from './assets/videoIcon.svg';
import { Modal } from 'antd';

export default class VidCard extends Component {
    state = {
        modal: false,
    }

    setModal = (modal) => {
        this.setState({ modal });
    }
    render() {
        let vid = this.props.vid;
        if (vid.source) {
            return (
                <div>
                    <video onClick={() => this.setModal(true)} src={vid.source} width="220" type="video/mp4" />
                    <Modal
                        title="Video"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal}
                        onOk={() => this.setModal(false)}
                        onCancel={() => this.setModal(false)}
                        footer={null}
                        width={760}
                    >
                        <video src={vid.source} type="video/mp4" width="720" controls />
                    </Modal>
                </div>
            );
        } else {
            return (
                <div>
                    <span>{vid.name}</span><br />
                    <img src={icon} alt="Not found" height="80" />
                </div>
            );
        }
    }
}
