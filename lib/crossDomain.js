//noinspection JSUnusedLocalSymbols
module.exports.middleware = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
            'X-Requested-With, Content-Type, If-None-Match, If-Modified-Since');
    next();
};

module.exports.allowUrl = function(app, url) {
    app.options(url, function(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
        res.end();
    });
};