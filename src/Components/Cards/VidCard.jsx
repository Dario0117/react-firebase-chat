import React, { Component } from 'react';
import icon from './assets/videoIcon.svg';

export default class VidCard extends Component {

    render() {
        let vid = this.props.vid;
        if (vid.source) {
            // if not controls, show static image... 
            return (
                <div>
                    <video src={vid.source} width="220" type="video/mp4" controls />
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
