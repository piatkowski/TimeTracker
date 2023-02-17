const express = require('express')
const passport = require('passport')

const router = express.Router()

const taskController = require('../controllers/task')
const access = require('../controllers/access')

const auth = passport.authenticate('cookie', { session: false, failWithError: true })

router.post('/', auth, access.allowMember, taskController.create)

router.get('/', auth, access.allowMember, taskController.getAll)

router.get('/:taskId/:collection?', auth, access.allowMember, taskController.getOne)

router.delete('/:taskId', auth, access.allowMember, taskController.delete)

router.patch('/:taskId', auth, access.allowMember, taskController.update)

module.exports = router;