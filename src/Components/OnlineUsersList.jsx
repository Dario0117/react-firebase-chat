import React from 'react';
import { Badge } from 'antd';

function OnlineUsersList(props) {
    return (
        <div>
            <ul style={{ padding: '0' }}>
                {props.users.map(user => {
                    let status = <Badge status="default" />;
                    if (user.status) {
                        status = <Badge status="success" />;
                    }
                    return <li key={user.key} style={{ listStyleType: 'none' }}>{status}<b>{user.name}</b></li>
                })}
            </ul>
        </div>
    )
}

export default OnlineUsersList;
