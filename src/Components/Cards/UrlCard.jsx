import React from 'react';
import { Card } from 'antd';
import Description from '../Utils/Description';

const { Meta } = Card;

function UrlCard(props) {
    let link = props.link;
    let host = new window.URL(link.url);
    let p = {
        host: `${host.protocol}//${host.hostname}`,
        description: link.description,
    }
    return (
        <Card onClick={() => {
            let win = window.open(link.url, '_blank');
            win.focus();
        }}
            style={{ width: 240, cursor: 'pointer' }}
            cover={<img alt="" src={link.image} />}
        >
            <Meta
                title={link.title}
                description={<Description {...p} />}
            />
        </Card>
    );
}

export default UrlCard;