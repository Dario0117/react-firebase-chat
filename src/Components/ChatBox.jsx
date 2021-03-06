import React from 'react';
import { Row, Col, Card } from 'antd';

import MessageList from './MessageList';
import MessageInput from './MessageInput';
import OnlineUsersList from './OnlineUsersList';
import Title from './Utils/Title';

function ChatBox(props) {
    return (
        <Row gutter={20}>
            <Col span={16}>
                <Card
                    title={<Title text="Chat" />}
                    style={{ width: '500px' }}
                >
                    <MessageList messageList={props.messageList} />
                    <hr/>
                    <MessageInput handleSendMessage={props.handleSendMessage} />
                </Card>
            </Col>
            <Col span={8}>
                <Card title={<Title text="Users on this room" />} style={{ width: '250px' }}>
                    <OnlineUsersList
                        users={props.users}
                        handleDisconnect={props.handleDisconnect}
                    />
                </Card>
            </Col>
        </Row>
    );
}

export default ChatBox;