const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', (req, res, next) => {
    try {
        // TODO: Implement login action (get the user if it exist with entered credentials)
        const data = AuthService.login(req.body)
        // res.data = data;
        res.status(200).json(data)
        next()
    } catch (err) {
        res.err = err;
    } finally {
        res.status(200)
        next();
    }
}, responseMiddleware);

module.exports = router;
