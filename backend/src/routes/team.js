const express = require('express')
const passport = require('passport')

const router = express.Router()

const authController = require('../controllers/auth')

//router.all('*', passport.authenticate('bearer', {session: false}), authController.allowOnly(['Admin', 'User']))

/*router.get('/', (req, res) => {
    res.send('...')
})*/

module.exports = router;