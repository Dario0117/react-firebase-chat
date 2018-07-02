module.exports = input => {

    let re = /\b(https?:\/\/|www2?.)\S*\b/m;
    let url = input.match(re);

    return url ? url[0] : null;
}