const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    console.error(`[Error]: ${err.message}`);
    console.error(`[Stacktrace]: ${err.stack}`);

    res.status(statusCode).json({
        error: err.message || "Internal Server Error",
        path: req.originalUrl,
    });
};




module.exports = errorMiddleware;