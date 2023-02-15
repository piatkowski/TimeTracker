const express = require('express')
const passport = require('passport')

const router = express.Router()

const authController = require('../controllers/auth')

router.post('/token', passport.authenticate('basic', { session: false }), authController.token)

router.post('/auth', passport.authenticate('cookie', { session: false }), authController.checkAuth)

router.post('/logout', passport.authenticate('cookie', { session: false }), authController.logout)

module.exports = router;