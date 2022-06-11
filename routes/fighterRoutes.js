const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');
const {fighter} = require("../models/fighter");

const router = Router();

//Get all fighters
router.get('/', (req, res, next) => {
  const fighters = FighterService.getAll()
  if (!fighters) {
    res.status(404)
    res.locals.error = {code: 404, message: 'Fighters do not exist'}
    next()
  } else {
    res.status(200).json(fighters)
    next()
  }
}, responseMiddleware)

//Get one user
router.get('/:id', (req, res, next) => {
  const user = UserService.search({id: req.params.id})
  if (!user) {
    res.status(404);
    res.locals.error = {code: 404, message: 'User not found'};
    next();
  } else {
    res.status(200).json(user)
    next()
  }
}, responseMiddleware)

//Create fighter
router.post('/', createFighterValid, (req, res, next) => {
  if (res.locals.error) {
    next()
  } else {
    const nameExist = FighterService.search({name: req.body.name})
    if (nameExist) {
      res.status(404);
      res.locals.error = {code: 404, message: 'Fighter already exists'};
      next();
    } else {
      //If default flag and body param is empty - set default value
      // for (let validField in fighter) {
      //   if (fighter[validField].default && !req.body[validField]) {
      //     req.body[validField] = fighter[validField].default
      //   }
      // }
      const createdFighter = FighterService.create(req.body);
      res.status(200).json(createdFighter)
      next()
    }
  }
}, responseMiddleware)

//Update user
router.put('/:id', updateFighterValid, (req, res, next) => {
  const idExist = FighterService.search({id: req.params.id});
  if (!idExist) {
    res.status(404);
    res.locals.error = {code: 404, message: 'User to update not found'};
    next()
  } else {
    if (req.body.email && FighterService.search({email: req.body.email})) {
      res.status(400);
      res.locals.error = {code: 400, message: 'This email already used by another user'};
      next()
    } else if (req.body.phoneNumber && FighterService.search({phoneNumber: req.body.phoneNumber})) {
      res.status(400);
      res.locals.error = {code: 400, message: 'This phone number already used by another user'};
      next();
    } else {
      const updatedUser = FighterService.update(req.params.id, req.body);
      res.status(200).json(updatedUser)
      next()
    }
  }
}, responseMiddleware)

//Delete user
router.delete('/:id', (req, res, next) => {
  const deletedUser = FighterService.delete(req.params.id)
  if (!deletedUser) {
    res.status(404);
    res.locals.error = {code: 404, message: 'User to delete not found'};
    next()
  } else {
    res.status(200).json(deletedUser)
    next()
  }
}, responseMiddleware)

module.exports = router;
