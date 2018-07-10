import React from 'react';

function Description(props) {
    return (
        <div>
            <p>{props.host}</p>
            <p>{props.description}</p>
        </div>
    );
}

export default Description;