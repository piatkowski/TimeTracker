const userRoutes = require('./user')
const teamRoutes = require('./team')
const authRoutes = require('./auth')

module.exports.apply = (app) => {

    app.use(authRoutes)

    app.use('/users', userRoutes)
    app.use('/teams', teamRoutes)

    app.use((err, req, res, next) => {
        res.status(err.code || 500).send({
            error: err.message || 'Something went wrong'
        })
    })
}
