module.exports = (url, _proxy = '') => {
    return new Promise((resolve, reject) => {
        // TODO: Limit the content-lenght to make more "faster" the request
        let proxy = _proxy || 'https://cors-anywhere.herokuapp.com/';
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${proxy}${url}`, true);
        xhr.addEventListener('progress', () => {
            if (xhr.responseText.includes('</head>')) {
                let startHeadIdx = xhr.responseText.indexOf('<head');
                let endHeadIdx = xhr.responseText.indexOf('</head>') + '</head>'.length;
                let parser = new window.DOMParser();
                let htmlStr = xhr.responseText.substring(startHeadIdx, endHeadIdx);
                let htmlDOM = parser.parseFromString(htmlStr, 'text/html');
                let metaTags = htmlDOM.querySelectorAll('meta');
                let parsedMetaTags = {};
                metaTags.forEach(el => {
                    let name = el.name || el.httpEquiv || el.attributes[0].value;
                    parsedMetaTags[name] = el.content;
                });
                resolve(parsedMetaTags);
                xhr.abort();
            }
        });
        xhr.addEventListener('load', () => {
            if (!xhr.responseText.includes('<head')) {
                reject('Can not find <head tag');
            } else if (!xhr.responseText.includes('</head>')) {
                reject('Can not find </head> tag');
            }
        });
        xhr.send();
    });
};