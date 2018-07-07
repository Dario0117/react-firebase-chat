import React from 'react';
import MessageRow from './MessageRow';

function ChatMessageList(props) {
    return (
        <div>
            {props.messageList.map(msg => (
                <MessageRow key={msg.id} msg={msg} />
            ))}
        </div>
    );
}

export default ChatMessageList;