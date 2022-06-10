const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();
// TODO: Implement route controllers for user

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
router.get('/:id', ((req, res) => {
  const user = UserService.search({id: req.params.id})
  res.send(user)
}))

//Create user
router.post('/', createUserValid, (req, res, next) => {
  //TODO: Implement validation
  if (res.locals.error) {
    next()
  } else {
    const createdUser = UserService.create(req.body);
    res.send(createdUser)
    next()
  }
}, responseMiddleware)

//Update user
router.put('/:id', ((req, res) => {

}))

//Delete user
router.delete('/:id', ((req, res) => {
  const deletedUser = UserService.delete(req.params.id)
  res.send(deletedUser)
}))

module.exports = router;
