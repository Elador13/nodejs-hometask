const { Router } = require('express');
const FightService = require('../services/fightService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');
const UserService = require("../services/userService");


const router = Router();

//Get all fights
router.get('/', (req, res, next) => {
  const fights = FightService.getAll()
  if (!fights) {
    res.status(404)
    res.locals.error = {code: 404, message: 'There are no fights yet'}
    return next()
  }
  res.status(200).json(fights)
  next()
}, responseMiddleware)

//Create fight
router.post('/', (req, res, next) => {
  if (res.locals.error) {
    return next()
  }
  const createdFight = FightService.create({...req.body});
  res.status(200).json(createdFight)
  next()
}, responseMiddleware)

module.exports = router;
