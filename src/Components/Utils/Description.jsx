import React from 'react';

function Description(props) {
    return (
        <div>
            <span>{props.host}</span>
            <br />
            <span style={{
                overflow: 'hidden',
                WebkitLineClamp: '2',
                width: '100%',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                color: 'black'
            }}
            >
                {props.description}
            </span>
        </div>
    );
}

export default Description;