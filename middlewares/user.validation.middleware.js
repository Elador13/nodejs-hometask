const {user} = require('../models/user');

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
      // continue;
    }

    //If regexp
    if (model[modelField].regexp && body[modelField]) {
      let passed = model[modelField].regexp.test(body[modelField]);
      model[modelField].regexp.lastIndex = 0;
      if (!passed) {
        errors.push(`${modelField} is invalid`);
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
      let passString = String(body[modelField])
      if (passString.length < model[modelField].min) {
        errors.push(`${modelField} must be more than ${model[modelField].min} symbols`)
      }
    }
    //If max
    if (model[modelField].max) {
      let passString = String(body[modelField])
      if (passString.length > model[modelField].max) {
        errors.push(`${modelField} must be less than ${model[modelField].max} symbols`)
      }
    }
  }

  return errors
};

const createUserValid = (req, res, next) => {
  let {firstName, lastName, email, phoneNumber, password, ...rest} = req.body

  let errors = validationByModel(req.body, user)
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
  next();
}

const updateUserValid = (req, res, next) => {
  //At least one field should exist
  if (!Object.keys(req.body).some((value) => Object.keys(user).includes(value))) {
    res.status(400)
    res.locals.error = {code: 400, message: 'At least one User\'s parameter should pass'}
    return next()
  }

  let {firstName, lastName, email, phoneNumber, password, ...rest} = req.body
  //If there are extra fields
  if (Object.keys(rest).length) {
    res.status(400)
    res.locals.error = {code: 400, message: `Invalid extra fields: ${Object.keys(rest)}`}
    return next()
  }

  let errors = validationByModel(req.body, user, 'update');
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

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
