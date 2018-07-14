import React, { Component } from 'react';
import { Modal, Icon } from 'antd';

import icon from './assets/videoIcon.svg';
import './VidCard.css';

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
                    <div
                        onClick={() => this.setModal(true)}
                        style={{ position: 'relative' }}
                    >
                        <video
                            src={vid.source}
                            type="video/mp4"
                            style={{ width: '220px' }}
                        />
                        <Icon
                            type="play-circle-o"
                            className="vid-card-icon"
                        />
                    </div>
                    <Modal
                        wrapClassName="vertical-center-modal"
                        visible={this.state.modal}
                        onCancel={() => this.setModal(false)}
                        footer={null}
                        width={760}
                    >
                        <center>
                            <video src={vid.source} type="video/mp4" width="720" controls />
                        </center>
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
