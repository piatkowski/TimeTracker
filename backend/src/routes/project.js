const express = require('express')
const passport = require('passport')

const router = express.Router()

const projectController = require('../controllers/project')
const access = require('../controllers/access')

const auth = passport.authenticate('cookie', { session: false, failWithError: true })

router.post('/', auth, access.allowLeader, projectController.create)

router.get('/', auth, access.allowMember, projectController.getAll)

router.get('/:projectId/:collection?', auth, access.allowMember, projectController.getOne)

router.delete('/:projectId', auth, access.allowLeader, projectController.delete)

router.patch('/:projectId', auth, access.allowLeader, projectController.update)

module.exports = router;