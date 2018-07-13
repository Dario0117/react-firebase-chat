import React from 'react';
import { Badge, Button } from 'antd';

function OnlineUsersList(props) {
    return (
        <div>
            <ul style={{ padding: '0' }}>
                {props.users.map(user => {
                    let status = <Badge status="default" />;
                    let color = 'grey';
                    if (user.status) {
                        status = <Badge status="success" />;
                        color = 'black';
                    }
                    return <li key={user.key} style={{ listStyleType: 'none', color }}>{status}<b>{user.name}</b></li>
                })}
            </ul>
            <center>
                <Button
                    onClick={props.handleDisconnect}
                    type="danger"
                    icon="logout"
                    ghost
                >
                    Logout
                </Button>
            </center>
        </div>
    )
}

export default OnlineUsersList;
