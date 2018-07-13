import React from 'react';
import UrlCard from './Cards/UrlCard';
import ImgCard from './Cards/ImgCard';
import VidCard from './Cards/VidCard';

function ChatMessage(props) {
    let card = '';
    let msg = props.msg;
    if (msg.attachments) {
        if (msg.attachments.image) {
            card = <ImgCard img={msg.attachments.image} />
        } else if (msg.attachments.link) {
            card = <UrlCard link={msg.attachments.link} />
        } else if (msg.attachments.video) {
            card = <VidCard vid={msg.attachments.video} />
        }
    }
    return (
        <div>
            <div style={{ color: 'black' }}>
                <span><strong>{props.msg.username}</strong></span>:
                <span> {props.msg.message}</span>
            </div>
            {card}
        </div>
    );
}

export default ChatMessage;