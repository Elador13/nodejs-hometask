const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', (req, res, next) => {
    try {
        const data = AuthService.login(req.body)
        res.status(200).json(data)
        next()
    } catch (err) {
        res.err = err;
        res.status(400);
        res.locals.error = {code: 400, message: 'Incorrect email or password'};
        return next()
    } finally {
        res.status(200)
        next();
    }
}, responseMiddleware);

module.exports = router;
