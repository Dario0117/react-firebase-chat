import React from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

const ChatBox = props => {
    return (
        <section name="chat-box">
            <MessageList messageList={props.messageList} />
            <MessageInput handleSendMessage={props.handleSendMessage} />
        </section>
    )
}

export default ChatBox;