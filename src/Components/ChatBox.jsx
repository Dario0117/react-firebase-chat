import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

function ChatBox(props) {
    return (
        <section name="chat-box">
            <input
                type="button"
                value="Disconnect"
                onClick={props.handleDisconnect}
            />
            <MessageList messageList={props.messageList} />
            <MessageInput handleSendMessage={props.handleSendMessage} />
        </section>
    );
}

export default ChatBox;