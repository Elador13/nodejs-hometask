const {Router} = require('express');
const UserService = require('../services/userService');
const {createUserValid, updateUserValid} = require('../middlewares/user.validation.middleware');
const {responseMiddleware} = require('../middlewares/response.middleware');

const router = Router();

//Get all users
router.get('/', (req, res, next) => {
  const users = UserService.getAll()
  if (!users) {
    res.status(404)
    res.locals.error = {code: 404, message: 'Users are not exist'}
    return next()
  }
  res.status(200).json(users)
  next()
}, responseMiddleware)

//Get one user
router.get('/:id', (req, res, next) => {
  const user = UserService.search({id: req.params.id})
  if (!user) {
    res.status(404);
    res.locals.error = {code: 404, message: 'User not found'};
    return next();
  }
  res.status(200).json(user)
  next()
}, responseMiddleware)

//Create user
router.post('/', createUserValid, (req, res, next) => {
  if (res.locals.error) {
    return next()
  }
  const foundByEmail = UserService.search({email: req.body.email.toLowerCase()})
  const foundByPhone = UserService.search({phoneNumber: req.body.phoneNumber})
  if (foundByEmail || foundByPhone) {
    res.status(400);
    res.locals.error = {code: 400, message: 'User already exists'};
    return next();
  }
  const createdUser = UserService.create({...req.body, email: req.body.email.toLowerCase()});
  res.status(200).json(createdUser)
  next()
}, responseMiddleware)

//Update user
router.put('/:id', updateUserValid, (req, res, next) => {
  if (res.locals.error) {
    return next()
  }
  const foundById = UserService.search({id: req.params.id});
  if (!foundById) {
    res.status(404);
    res.locals.error = {code: 404, message: 'User to update not found'};
    return next()
  }
  if (req.body.email) {
    const foundByEmail = UserService.search({email: req.body.email.toLowerCase()})
    if (foundByEmail
      && (foundByEmail.id !== req.params.id)) {
      res.status(400);
      res.locals.error = {code: 400, message: 'This email already used by another user'};
      return next()
    }
  }
  if (req.body.phoneNumber) {
    const foundByPhone = UserService.search({phoneNumber: req.body.phoneNumber})
    if (foundByPhone && (foundByPhone.id !== req.params.id)) {
      res.status(400);
      res.locals.error = {code: 400, message: 'This phone number already used by another user'};
      return next();
    }
  }
  const updatedUser = UserService.update(req.params.id, {...req.body});
  res.status(200).json(updatedUser)
  next()
}, responseMiddleware)

//Delete user
router.delete('/:id', (req, res, next) => {
  const deletedUser = UserService.delete(req.params.id)
  if (!deletedUser) {
    res.status(404);
    res.locals.error = {code: 404, message: 'User to delete not found'};
    return next()
  }
  res.status(200).json(deletedUser)
  next()
}, responseMiddleware)

module.exports = router;
