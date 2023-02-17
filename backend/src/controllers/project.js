const Project = require('../models/Project')
const mongoose = require('mongoose')

module.exports.create = async (req, res, next) => {
    // @todo create Project
}

module.exports.getAll = async (req, res, next) => {
    try {
        let params = {}
        const projects = await Project.find(params).populate('team tags')
        res.send(projects)
    } catch (err) {
        next(err)
    }
}

module.exports.getOne = async (req, res, next) => {
    try {
        let project;

        if (req.authInfo.scope === 'User') {
            project = await Project.find({ team: req.user.team }).populate('tags')
        } else {
            project = await Project.findById(req.params.projectId).populate('tags')
        }

        if (req.params.collection) {
            const collection = req.params.collection
            if (['team', 'tags', 'users', 'tags'].includes(collection)) {
                await project.populate(collection)
            }
        }
        res.send(project)
    } catch (err) {
        next(err)
    }
}

module.exports.delete = async (req, res, next) => {
    let findCondition = { _id: req.params.projectId };
    if (req.authInfo.scope === 'User') {
        findCondition['team'] = req.user.team;
    }
    await Project.deleteOne(findCondition);
    res.send();
}

module.exports.update = async (req, res, next) => {
    let findCondition = { _id: req.params.projectId };
    if (req.authInfo.scope === 'User') {
        findCondition['team'] = req.user.team;
    }
    await Project.updateOne(findCondition, { /* .... */ });
    res.send();
}