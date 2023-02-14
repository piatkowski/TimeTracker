const express = require('express')
const passport = require('passport')

const router = express.Router()

const userController = require('../controllers/user')
const authController = require('../controllers/auth')

router.all('*', passport.authenticate('bearer', {session: false}), authController.allowOnly(['Admin']))

router.post('/', userController.create)

router.get('/', userController.getAll)

router.get('/:userId/:collection?', userController.getOne)

router.delete('/:userId', userController.delete)

router.patch('/:userId', userController.update)

module.exports = router;