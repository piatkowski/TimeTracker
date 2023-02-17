const User = require('../models/User')
const mongoose = require("mongoose");

module.exports.create = async (req, res, next) => {

    if (!req.body.name || !req.body.password) {
        res.send({
            success: false,
            error: 'Name and password are required'
        })
    }

    // @todo validation

    try {
        const user = new User({
            name: req.body.name,
            password: req.body.password,
            type: 'User',
            role: (req.body.role && req.body.role === 'TeamLeader') ? 'TeamLeader' : 'TeamMember',
            firstName: req.body.firstName ?? '',
            lastName: req.body.lastName ?? '',
            team: new mongoose.Types.ObjectId(req.body.team)
        })
        await user.save()
        res.send({ success: true })
    } catch (err) {
        next(err)
    }
}

module.exports.getAll = async (req, res, next) => {
    try {
        const users = await User.find().populate('team')
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