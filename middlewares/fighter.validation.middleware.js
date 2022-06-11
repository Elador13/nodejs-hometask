const {fighter} = require('../models/fighter');

const validationByModel = (body, model, mode = 'create') => {
  let errors = []

  for (let modelField in model) {
    if (modelField === 'id') {
      continue
    }
    // //if empty
    // if (!body[modelField].length) {
    //   errors.push(`${modelField} must not be empty!`)
    //   continue
    // }

    //If required
    if (!body[modelField] && mode === 'create' && model[modelField].required) {
      errors.push(`${modelField} is required`);
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
    next()
  }

  if (rest.id) {
    res.status(400)
    res.locals.error = {code: 400, message: 'Cannot accept id field'}
    next()
  } else if (Object.keys(rest).length) {
    res.status(400)
    res.locals.error = {code: 400, message: `Invalid extra fields: ${Object.keys(rest)}`}
    next()
  } else {
    //If default flag and body param is empty - set default value
    for (let validField in fighter) {
      if (fighter[validField].default && !req.body[validField]) {
        req.body[validField] = fighter[validField].default
      }
    }
    next();
  }
  next();
}

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during update
  //At least one field should exist
  if (Object.keys(req.body).some((value) => Object.keys(fighter).includes(value))) {
    let {firstName, lastName, email, phoneNumber, password, ...rest} = req.body

    //If there are extra fields
    if (Object.keys(req.body).some(field => !Object.keys(fighter).includes(field))) {
      console.log('here')
      res.status(400)
      res.locals.error = {code: 400, message: `Invalid extra fields`}
      next()
    }

    let errors = validationByModel(req.body, fighter, 'update');
    console.log(errors)
    if (errors.length) {
      res.status(400)
      res.locals.error = {code: 400, message: errors.join('; ')}
      next()
    }
    if (rest.id) {
      res.status(400)
      res.locals.error = {code: 400, message: 'Cannot accept id field'}
      next()
    }
  } else {
    res.status(400)
    res.locals.error = {code: 400, message: 'Fighter entity to update isn\'t valid'}
    next()
  }
  next();
}

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
