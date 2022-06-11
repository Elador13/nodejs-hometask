const {fighter} = require('../models/fighter');

const validationByModel = (body, model, mode = 'create') => {
  let errors = []

  for (let modelField in model) {
    if (modelField === 'id') {
      continue
    }

    //If required
    if (!body[modelField] && mode === 'create' && model[modelField].required) {
      errors.push(`${modelField} is required`);
      continue;
    }

    // Not empty
    if (mode === 'update') {
      if (body[modelField] === "") {
        errors.push(`${modelField} cannot be empty!`);
      }
      continue;
    }

    //If Type doesn't match
    if (body[modelField] && model[modelField].type && (typeof body[modelField] !== model[modelField].type)) {
      errors.push(`${modelField} must be ${model[modelField].type}`)
      continue
    }

    //If min
    if (model[modelField].min) {
      let fieldInt = parseInt(body[modelField]);
      if (fieldInt < model[modelField].min) {
        errors.push(`${modelField} must be more than ${model[modelField].min}`)
      }
    }
    //If max
    if (model[modelField].max) {
      let fieldInt = parseInt(body[modelField])
      if (fieldInt > model[modelField].max) {
        errors.push(`${modelField} must be less than ${model[modelField].max}`)
      }
    }
  }
  return errors
};

const createFighterValid = (req, res, next) => {
  let {name, health, power, defense, ...rest} = req.body

  let errors = validationByModel(req.body, fighter)
  if (errors.length) {
    res.status(400)
    res.locals.error = {code: 400, message: errors.join('; ')}
    return next()
  }
  if (rest.id) {
    res.status(400)
    res.locals.error = {code: 400, message: 'Cannot accept id field'}
    return next()
  }
  if (Object.keys(rest).length) {
    res.status(400)
    res.locals.error = {code: 400, message: `Invalid extra fields: ${Object.keys(rest)}`}
    return next()
  }
  //If default flag and body param is empty - set default value
  for (let modelField in fighter) {
    if (fighter[modelField].default && !req.body[modelField]) {
      req.body[modelField] = fighter[modelField].default
    }
  }
  next();
}

const updateFighterValid = (req, res, next) => {
  //At least one field should exist
  if (!Object.keys(req.body).some((value) => Object.keys(fighter).includes(value))) {
    res.status(400)
    res.locals.error = {code: 400, message: 'At least one Fighter\'s parameter should pass'}
    return next()
  }

  let {name, health, power, defense, ...rest} = req.body
  //If there are extra fields
  if (Object.keys(rest).length) {
    res.status(400)
    res.locals.error = {code: 400, message: `Invalid extra fields: ${Object.keys(rest)}`}
    return next()
  }

  let errors = validationByModel(req.body, fighter, 'update');
  if (errors.length) {
    res.status(400)
    res.locals.error = {code: 400, message: errors.join('; ')}
    return next()
  }
  if (rest.id) {
    res.status(400)
    res.locals.error = {code: 400, message: 'Cannot accept id field'}
    return next()
  }

  next()
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
