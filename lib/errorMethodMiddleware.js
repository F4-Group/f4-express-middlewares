module.exports.middleware = function (logule) {
    return function (req, res, next) {
        res.error = function (err) {
            logule.error(err);
            var sent = err;
            if (err.message)
                sent = err.message;
            res.status(500).send(sent);
        };
        next();
    };
};