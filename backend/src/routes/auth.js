const express = require('express')
const passport = require('passport')

const router = express.Router()

const authController = require('../controllers/auth')

router.post('/token', passport.authenticate('basic', { session: false, failWithError: true }), authController.token)

router.post('/auth', passport.authenticate('cookie', { session: false, failWithError: true }), authController.checkAuth)

router.post('/logout', passport.authenticate('cookie', { session: false, failWithError: true }), authController.logout)

module.exports = router;