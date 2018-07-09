import React from 'react';

function UrlCard(props) {
    let link = props.link;
    let host = new window.URL(link.url);
    return (
        <div>
            <span>{link.title}</span><br />
            <span>{link.description}</span><br />
            <span>{`${host.protocol}//${host.hostname}`}</span><br />
            <img src={link.image} alt="Not found" height="80" />
        </div>
    );
}

export default UrlCard;