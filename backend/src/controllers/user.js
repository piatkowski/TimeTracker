const User = require('../models/User')

module.exports.create = async (req, res, next) => {

    if (!req.params.name || !req.params.password) {
        res.send({
            status: 'Name and password are required'
        })
    }

    // @todo validation

    try {
        const user = new User({
            name: req.params.name,
            password: req.params.password,
            type: 'User',
            role: (req.params.role && req.params.role === 'TeamLeader') ? 'TeamLeader' : 'TeamMember'
        })
        const newUser = await user.save()
        res.send(newUser)
    } catch (err) {
        next(err)
    }
}

module.exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (err) {
        next(err)
    }
}

module.exports.getOne = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId)
        if (req.params.collection) {
            const collection = req.params.collection
            if (['projects', 'tasks', 'team'].includes(collection)) {
                await user.populate(collection)
            }
        }
        res.send(user)
    } catch (err) {
        next(err)
    }
}

module.exports.delete = async (req, res, next) => {
    const userId = req.params.userId
    await User.deleteOne({ _id: userId });
}

module.exports.update = async (req, res, next) => {
    const userId = req.params.userId
    await User.updateOne({ _id: userId }, { /* .... */ })
}