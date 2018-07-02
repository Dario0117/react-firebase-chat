module.exports = url => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const proxy = "https://metascraper-implementation.herokuapp.com/"
        xhr.open('POST', proxy, true);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.addEventListener('error', reject);
        xhr.addEventListener('load', () => {
            resolve(JSON.parse(xhr.responseText));
        });
        xhr.send(JSON.stringify({
            url
        }));
    });
};