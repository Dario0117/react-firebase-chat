import React from 'react';

function OnlineUsersList(props) {
    return (
        <div>
            <ul>
                {props.users.map(user => {
                    let status = 'offline';
                    if (user.status) {
                        status = 'online';
                    }
                    return <li key={user.key} >{status} {user.name}</li>
                })}
            </ul>
        </div>
    )
}

export default OnlineUsersList;
