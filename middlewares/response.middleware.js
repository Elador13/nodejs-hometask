const responseMiddleware = (req, res, next) => {
    if (res.err) {
        if (res.locals.error) {
            res.status(res.locals.error.code);
            res.json({error: true, message: res.locals.error.message});
            return next()
        } else {
            res.status(res.statusCode !== 200 ? res.statusCode : 400)
            res.json({error: true, message: res.err.message});
            return next();
        }
    }

    if ((res.statusCode === 404 || res.statusCode === 400) && res.locals.error) {
        res.status(res.locals.error.code);
        res.json({error: true, message: res.locals.error.message});
        next()
    } else {
        res.status(200);
        next();
    }
    next()
}

exports.responseMiddleware = responseMiddleware;
