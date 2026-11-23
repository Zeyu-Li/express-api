/**
 * last-resort error handler: logs the error server-side and sends the client a
 * generic JSON message, so stack traces and file paths never leak in responses
 * @param {*} err
 * error passed to next() or thrown/rejected in a route
 * @param {*} req
 * user request
 * @param {*} res
 * user response
 * @param {*} next
 * next piece of middleware callback
 * @returns response
 */
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    // body-parser errors (e.g. malformed JSON) carry a 4xx status
    if (err.status >= 400 && err.status < 500) {
        return res.status(err.status).json({message: "The request data is invalid or not clean"})
    }
    console.error(err)
    return res.status(500).json({message: "Internal server error"})
}

module.exports = errorHandler
