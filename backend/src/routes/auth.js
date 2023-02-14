const express = require('express')
const passport = require('passport')

const router = express.Router()

const authController = require('../controllers/auth')

router.post('/token', passport.authenticate('basic', { session: false }), authController.token)

module.exports = router;