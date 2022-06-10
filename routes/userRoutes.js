const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();
// TODO: Implement route controllers for user

router.get('/', ((req, res) => {
  console.log('here')
  res.send('GET')
}))

router.post('/', ((req, res) => {

}))

router.put('/:id', ((req, res) => {

}))

router.delete('/:id', ((req, res) => {

}))

module.exports = router;
