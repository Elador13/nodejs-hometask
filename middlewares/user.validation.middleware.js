const { user } = require('../models/user');

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    let {firstName, lastName, email, phoneNumber, password, ...rest} = req.body
    // console.log(firstName)
    // console.log(lastName)
    // console.log(email)
    // console.log(phoneNumber)
    // console.log(password)
    // console.log(rest)
    if (Object.keys(rest).length) {
        console.log('Invalid')
        res.status(400)
        res.locals.error = {code: 400, message: `Invalid extra fields: ${Object.keys(rest)}`}
        next()
    } else {
        next()
    }
}

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update

    next();
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
