const express = require('express')
const passport = require('passport')

const router = express.Router()

const teamController = require('../controllers/team')
const authController = require('../controllers/auth')

const auth = passport.authenticate('bearer', {session: false})

const allowAdmin = authController.allowOnly(['Admin'])
const allowUser = authController.allowOnly(['Admin', 'User'])

router.post('/', auth, allowUser, teamController.create)

router.get('/', auth, allowUser, teamController.getAll)

router.get('/:teamId/:collection?', auth, allowUser, teamController.getOne)

router.delete('/:teamId', auth, allowAdmin, teamController.delete)

router.patch('/:teamId', auth, allowUser, teamController.update)

module.exports = router;