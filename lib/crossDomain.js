module.exports = {
    middleware: middleware,
    allowUrl: allowUrl,
};

function setResponseHeaders(res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', [
        'X-Requested-With',
        'Content-Type',
        'If-None-Match',
        'If-Modified-Since',
        'Cache-Control',
        'Accept-Encoding', //safari
        'Accept-Language', //safari
    ].join(', '));
    res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
}

function middleware(req, res, next) {
    setResponseHeaders(res);
    next();
}

function allowUrl(app, url) {
    app.options(url, function (req, res) {
        setResponseHeaders(res);
        res.end();
    });
}
