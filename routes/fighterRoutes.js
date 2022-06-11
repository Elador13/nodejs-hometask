const {Router} = require('express');
const FighterService = require('../services/fighterService');
const {responseMiddleware} = require('../middlewares/response.middleware');
const {createFighterValid, updateFighterValid} = require('../middlewares/fighter.validation.middleware');
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

//Get one fighter
router.get('/:id', (req, res, next) => {
  const fighter = FighterService.search({id: req.params.id})
  if (!fighter) {
    res.status(404);
    res.locals.error = {code: 404, message: 'Fighter not found'};
    next();
  } else {
    res.status(200).json(fighter)
    next()
  }
}, responseMiddleware)

//Create fighter
router.post('/', createFighterValid, (req, res, next) => {
  if (res.locals.error) {
    return next()
  }
  const nameExist = FighterService.search({name: req.body.name.toLowerCase()})
  if (nameExist) {
    res.status(404);
    res.locals.error = {code: 404, message: 'Fighter already exists'};
    return next();
  }
  const createdFighter = FighterService.create({...req.body, name: req.body.name.toLowerCase()});
  res.status(200).json(createdFighter)
  next()
}, responseMiddleware)

//Update fighter
router.put('/:id', updateFighterValid, (req, res, next) => {
  if (res.locals.error) {
    return next()
  }
  const idExist = FighterService.search({id: req.params.id});
  if (!idExist) {
    res.status(404);
    res.locals.error = {code: 404, message: 'Fighter to update not found'};
    return next()
  }
  if (req.body.name) {
    const existingName = FighterService.search({name: req.body.name.toLowerCase()})
    if (existingName && (existingName.name.toLowerCase() === req.body.name.toLowerCase())) {
      res.status(400);
      res.locals.error = {code: 400, message: 'This name already used by another fighter'};
      return next()
    }
  }
  const updatedFighter = FighterService.update(req.params.id, req.body);
  res.status(200).json(updatedFighter)
  next()
}, responseMiddleware)

//Delete fighter
router.delete('/:id', (req, res, next) => {
  const deletedFighter = FighterService.delete(req.params.id)
  if (!deletedFighter) {
    res.status(404);
    res.locals.error = {code: 404, message: 'Fighter to delete not found'};
    next()
  } else {
    res.status(200).json(deletedFighter)
    next()
  }
}, responseMiddleware)

module.exports = router;
