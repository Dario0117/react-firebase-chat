import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import OnlineUsersList from './OnlineUsersList';

function ChatBox(props) {
    return (
        <section name="chat-box">
            <input
                type="button"
                value="Disconnect"
                onClick={props.handleDisconnect}
            />
            <OnlineUsersList users={props.users} />
            <MessageList messageList={props.messageList} />
            <MessageInput handleSendMessage={props.handleSendMessage} />
        </section>
    );
}

export default ChatBox;