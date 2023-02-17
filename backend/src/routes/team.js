const express = require('express')
const passport = require('passport')

const router = express.Router()

const teamController = require('../controllers/team')
const access = require('../controllers/access')

const auth = passport.authenticate('cookie', { session: false, failWithError: true })

router.post('/', auth, access.allowAdmin, teamController.create)

router.get('/', auth, access.allowMember, teamController.getAll)

router.get('/:teamId/:collection?', auth, access.allowMember, teamController.getOne)

router.delete('/:teamId', auth, access.allowAdmin, teamController.delete)

router.patch('/:teamId', auth, access.allowAdmin, teamController.update)

module.exports = router;