const userRoutes = require('./user')
const teamRoutes = require('./team')
const authRoutes = require('./auth')
const projectRoutes = require('./project')
const taskRoutes = require('./task')

module.exports.apply = (app) => {

    app.use(authRoutes)

    app.use('/users', userRoutes)

    app.use('/teams', teamRoutes)

    app.use('/projects', projectRoutes)

    app.use('/tasks', taskRoutes)

    app.use((err, req, res, next) => {
        res.status(err.status || 500).end()
    })
}

