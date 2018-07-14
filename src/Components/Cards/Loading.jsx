import React from 'react';

import './Loading.css';

function Loading() {
    return (
        <article className="container">
            <div className="background">
                <div className="left">
                    <div className="image"></div>
                </div>
                <div className="right">
                    <div className="bar"></div>
                    <div className="mask thin"></div>
                    <div className="bar medium"></div>
                    <div className="mask thin"></div>
                    <div className="bar"></div>
                    <div className="mask min"></div>
                    <div className="bar"></div>
                    <div className="mask thick"></div>
                </div>
            </div>
        </article>
    );
}

export default Loading;