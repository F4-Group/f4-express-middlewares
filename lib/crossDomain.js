var ALLOW_ORIGIN = '*';
var ALLOW_HEADERS = 'X-Requested-With, Content-Type, If-None-Match, If-Modified-Since, Cache-Control';

module.exports.middleware = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', ALLOW_HEADERS);
    next();
};

module.exports.allowUrl = function(app, url) {
    app.options(url, function(req, res) {
        res.set('Access-Control-Allow-Origin', ALLOW_ORIGIN);
        res.set('Access-Control-Allow-Headers', ALLOW_HEADERS);
        res.end();
    });
};