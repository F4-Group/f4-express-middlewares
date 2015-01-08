var crypto = require('crypto');

module.exports = function (req, res, next) {
    var needsEtag = req.method === 'GET';
    if (needsEtag) {
        var hash = crypto.createHash('md5');
        var write = res.write;
        var chunks = [];
        res.write = function (chunk) {
            if (res.get('Last-Modified'))
                needsEtag = false;
            if (needsEtag && hash) {
                hash.update(chunk);
                chunks.push(chunk);
            }
            else {
                write.apply(res, arguments);
            }
        };
        var end = res.end;
        res.end = function (data) {
            if (data)
                res.write.apply(res, arguments);
            if (needsEtag) {
                if (hash && chunks.length > 0) {
                    var etag = hash.digest('hex');
                    this.set('ETag', etag);
                    hash = null;
                }
                if (!this.get('Cache-Control'))
                    this.set('Cache-Control', 'max-age=0, must-revalidate');
                chunks.forEach(function (chunk) {
                    write.call(res, chunk);
                });
            }
            end.apply(res);
        };
    }
    next();
};
