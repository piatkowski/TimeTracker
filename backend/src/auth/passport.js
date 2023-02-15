const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const BearerStrategy = require('passport-http-bearer').Strategy
const CookieStrategy = require('passport-cookie').Strategy

const User = require('../models/User')

passport.use(new BasicStrategy(
    (username, password, done) => {
        User.findOne({name: username}, '+password', async (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            try {
                const isPasswordMatch = await user.checkPassword(password)

                if (!isPasswordMatch) {
                    return done(null, false);
                }
                const newToken = await user.regenerateToken();
                return done(null, {token: newToken});
            } catch (err) {
                return done(null, false);
            }
        });
    }
));

passport.use(new CookieStrategy(
    (token, done) => {
        User.findOne({token: token}, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user, {scope: user.type});
        });
    }
));

passport.use(new BearerStrategy(
    (token, done) => {
        User.findOne({token: token}, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user, {scope: user.type});
        });
    }
));