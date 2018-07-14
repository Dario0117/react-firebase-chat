import React from 'react';
import { Row, Col } from 'antd';
import Description from '../Utils/Description';

function UrlCard(props) {
    let link = props.link;
    let host = new window.URL(link.url);
    let p = {
        host: `${host.protocol}//${host.hostname}`,
        description: link.description,
    }
    return (
        <Row
            style={{
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: '#AEAEAE',
                cursor: 'pointer',
                background: '#F3F3F3'
            }}
            onClick={() => {
                let win = window.open(link.url, '_blank');
                win.focus();
            }}
        >
            <Col span={8} >
                <img style={{ maxHeight: '80px' }} alt="" src={link.image} />
            </Col>
            <Col span={16}>
                <Row>
                    <span
                        style={{
                            fontWeight: 'bold',
                            overflow: 'hidden',
                            WebkitLineClamp: '1',
                            width: '100%',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            color: 'black'
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