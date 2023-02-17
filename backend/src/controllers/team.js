const Team = require('../models/Team')
const mongoose = require('mongoose')

module.exports.create = async (req, res, next) => {

    const leaderId = req.authInfo.scope === 'Admin' ? req.body.leader : req.user._id

    if (!req.body.name || !leaderId) {
        return res.send({
            status: 'Team Name and Leader are required'
        })
    }

    // @todo validation

    try {
        const team = new Team({
            name: req.body.name,
            leader: mongoose.Types.ObjectId(leaderId)
        })
        const savedTeam = await team.save()
        res.send(savedTeam)
    } catch (err) {
        next(err)
    }
}

module.exports.getAll = async (req, res, next) => {
    try {
        let params = {}
        let populate = ['leader'];
        if (req.authInfo.scope === 'User') {
            params = {_id: req.user.team}
            populate.push('users')
        }

        const teams = await Team.find(params).populate(populate)
        res.send(teams)
    } catch (err) {
        next(err)
    }
}

module.exports.getOne = async (req, res, next) => {
    try {
        const teamId = req.authInfo.scope === 'User' ? req.user.team : req.params.teamId
        const team = await Team.findById(teamId).populate('leader')
        if (req.params.collection) {
            const collection = req.params.collection
            if (['projects', 'users', 'leader'].includes(collection)) {
                await team.populate(collection)
            }
        }
        res.send(team)
    } catch (err) {
        next(err)
    }
}

module.exports.delete = async (req, res, next) => {
    const teamId = req.params.teamId;
    await Team.deleteOne({_id: teamId});
    res.send()
}

module.exports.update = async (req, res, next) => {
    const teamId = req.authInfo.scope === 'User' ? req.user.team : req.params.teamId
    await Team.updateOne({_id: teamId}, { /* .... */})
    res.send()
}