const express = require('express')
const passport = require('passport')

const router = express.Router()

const userController = require('../controllers/user')
const access = require('../controllers/access')

const auth = passport.authenticate('cookie', { session: false, failWithError: true })

router.post('/', auth, access.allowAdmin, userController.create)

router.get('/', auth, access.allowAdmin, userController.getAll)

router.get('/:userId/:collection?', auth, access.allowAdmin, userController.getOne)

router.delete('/:userId', auth, access.allowAdmin, userController.delete)

router.patch('/:userId', auth, access.allowAdmin, userController.update)

module.exports = router;