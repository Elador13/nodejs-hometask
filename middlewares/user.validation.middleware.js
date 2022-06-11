const { user } = require('../models/user');

const fieldsValidation = (body, model, mode = 'create') => {
    let errors = []

    for (let validField in model) {
        if (!body[validField]) {
            continue
        }

        //If required
        if (mode === 'create' && model[validField].required) {
            if (!body[validField]) {
                errors.push(`${validField} is required`)
                continue
            }
        }
        //If regexp
        if (model[validField].regexp) {
            let passed = model[validField].regexp.test(body[validField])
            model[validField].regexp.lastIndex = 0
            if (!passed) errors.push(`${validField} is invalid`)
            continue
        }
        //If min
        if (model[validField].min) {
            let passString = String(body[validField])
            if (passString.length < model[validField].min) {
                errors.push(`${validField} must be more than ${model[validField].min} symbols`)
            }
        }
        //If max
        if (model[validField].max) {
            let passString = String(body[validField])
            if (passString.length > model[validField].max) {
                errors.push(`${validField} must be less than ${model[validField].max} symbols`)
            }
        }
    }

    return errors
};

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    let {firstName, lastName, email, phoneNumber, password, ...rest} = req.body

    let errors = fieldsValidation(req.body, user)
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
        next();
    }
}

const updateUserValid = (req, res, next) => {
    // if (!req.params.id) {
    //     console.log('here')
    //     res.status(400)
    //     res.locals.error = {code: 400, message: `You must pass user id`}
    //     next()
    // }

    let {firstName, lastName, email, phoneNumber, password, ...rest} = req.body;

    //At least one field should exist
    if (Object.keys(req.body).some((value) => Object.keys(user).includes(value))) {
        let {firstName, lastName, email, phoneNumber, password, ...rest} = req.body

        //If there are extra fields
        if (Object.keys(req.body).some(field => !Object.keys(user).includes(field))) {
            res.status(400)
            res.locals.error = {code: 400, message: `Invalid extra fields`}
            next()
        }

        let errors = fieldsValidation(req.body, user, 'update');
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
        // res.status(400)
        // res.locals.error = {code: 400, message: 'User entity to update isn\'t valid'}
        next()
    }
    next()

}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
