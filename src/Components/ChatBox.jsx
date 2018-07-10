import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import OnlineUsersList from './OnlineUsersList';
import { Row, Col } from 'antd';

function ChatBox(props) {
    return (
        <section name="chat-box">
            <Row>
                <Col span={18}>
                    <MessageList messageList={props.messageList} />
                    <MessageInput handleSendMessage={props.handleSendMessage} />
                </Col>
                <Col span={6}>
                    <OnlineUsersList users={props.users} />
                    <input
                        type="button"
                        value="Disconnect"
                        onClick={props.handleDisconnect}
                    />
                </Col>
            </Row>
        </section>
    );
}

export default ChatBox;