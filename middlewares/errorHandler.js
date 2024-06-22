const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    switch (statusCode) {
        case 400:
            res.status(statusCode).json({
                title: "Bad Request",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 401:
            res.status(statusCode).json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 403:
            res.status(statusCode).json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 404:
            res.status(statusCode).json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 500:
            res.status(statusCode).json({
                title: "Internal Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 502:
            res.status(statusCode).json({
                title: "Bad Gateway",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 503:
            res.status(statusCode).json({
                title: "Service Unavailable",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 504:
            res.status(statusCode).json({
                title: "Gateway Timeout",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            res.status(statusCode).json({
                title: "Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
    }
};

module.exports = errorHandler;
