import React from 'react';
import { Row, Col } from 'antd';

import Description from '../Utils/Description';
import './UrlCard.css';

function UrlCard(props) {
    let link = props.link;
    let host = new window.URL(link.url);
    let p = {
        host: `${host.protocol}//${host.hostname}`,
        description: link.description,
    }
    return (
        <Row
            className="url-card"
            onClick={() => {
                let win = window.open(link.url, '_blank');
                win.focus();
            }}
        >
            <Col span={9} >
                <img style={{ maxHeight: '100px', width: '150px' }} alt="" src={link.image} />
            </Col>
            <Col span={15}>
                <Row>
                    <span
                        className="url-card-title"
                        style={{
                            WebkitLineClamp: '1',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {link.title}
                    </span>
                </Row>
                <Row>
                    <Description {...p} />
                </Row>
            </Col>
        </Row>
    );
}

export default UrlCard;