const Task = require('../models/Task')
const mongoose = require('mongoose')

module.exports.create = async (req, res, next) => {
    // @todo create task
}

module.exports.getAll = async (req, res, next) => {
    try {
        let params = {};
        if (req.authInfo.scope === 'User') {
            params = { user: req.user._id }
        }
        const tasks = await Task.find(params).populate('project tags user')
        res.send(tasks)
    } catch (err) {
        next(err)
    }
}

module.exports.getOne = async (req, res, next) => {
    try {
        let params = {_id: req.params.taskId};
        if (req.authInfo.scope === 'User') {
            params['user'] = req.user._id;
        }
        const task = await Task.find(params).populate('project tags user')
        res.send(task)
    } catch (err) {
        next(err)
    }
}

module.exports.delete = async (req, res, next) => {
    let params = {_id: req.params.taskId};
    if (req.authInfo.scope === 'User') {
        params['user'] = req.user._id;
    }
    await Task.deleteOne(params);
    res.send();
}

module.exports.update = async (req, res, next) => {
    let params = {_id: req.params.taskId};
    if (req.authInfo.scope === 'User') {
        params['user'] = req.user._id;
    }
    await Task.updateOne(params, { /* .... */ })
    res.send()
}