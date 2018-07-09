import React from 'react';

function ImgCard(props) {
    let image = props.img;
    return (
        <div>
            <img src={image.full} alt="" />
        </div>
    );
}

export default ImgCard;