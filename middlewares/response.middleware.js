const responseMiddleware = (req, res, next) => {
   // TODO: Implement middleware that returns result of the query
    if (res.err) {
        console.log(res.err)
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
