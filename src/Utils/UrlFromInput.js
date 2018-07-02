module.exports = input => {

    let re = /\bhttps?:\/\/\S*\b/m;
    let url = input.match(re);

    return url ? url[0] : null;
}