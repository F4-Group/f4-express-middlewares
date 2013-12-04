module.exports = {
    crossDomain: require("./lib/crossDomain"),
    errorMethod: require("./lib/errorMethodMiddleware"),
    etagify: require("./lib/etagify"),
};