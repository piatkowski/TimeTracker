const express = require('express')
const passport = require('passport')

const router = express.Router()

const userController = require('../controllers/user')
const authController = require('../controllers/auth')

const auth = passport.authenticate('cookie', {session: false})

const allowAdmin = authController.allowOnly(['Admin'])


router.post('/', auth, allowAdmin, userController.create)

router.get('/', auth, allowAdmin, userController.getAll)

router.get('/:userId/:collection?', auth, allowAdmin, userController.getOne)

router.delete('/:userId', auth, allowAdmin, userController.delete)

router.patch('/:userId', auth, allowAdmin, userController.update)

module.exports = router;