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
    next()
  } else {
    res.status(200).json(users)
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

//Create user
router.post('/', createUserValid, (req, res, next) => {
  if (res.locals.error) {
    next()
  } else {
    const emailExist = UserService.search({email: req.body.email})
    const phoneExist = UserService.search({phoneNumber: req.body.phoneNumber})
    if (emailExist || phoneExist) {
      res.status(404);
      res.locals.error = {code: 404, message: 'User already exists'};
      next();
    } else {
      const createdUser = UserService.create(req.body);
      res.status(200).json(createdUser)
      next()
    }
  }
}, responseMiddleware)

//Update user
router.put('/:id', updateUserValid, (req, res, next) => {
  const idExist = UserService.search({id: req.params.id});
  if (!idExist) {
    res.status(404);
    res.locals.error = {code: 404, message: 'User to update not found'};
    next()
  } else {
    if (req.body.email && UserService.search({email: req.body.email})) {
      res.status(400);
      res.locals.error = {code: 400, message: 'This email already used by another user'};
      next()
    } else if (req.body.phoneNumber && UserService.search({phoneNumber: req.body.phoneNumber})) {
      res.status(400);
      res.locals.error = {code: 400, message: 'This phone number already used by another user'};
      next();
    } else {
      const updatedUser = UserService.update(req.params.id, req.body);
      res.status(200).json(updatedUser)
      next()
    }
  }
}, responseMiddleware)

//Delete user
router.delete('/:id', (req, res, next) => {
  const deletedUser = UserService.delete(req.params.id)
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
