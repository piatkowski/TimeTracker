const mongoose = require('mongoose')

const User = require('../models/User')
const Team = require('../models/Team')
const Project = require('../models/Project')
const Tag = require('../models/Tag')
const Task = require('../models/Task')

const generate = async () => {
    await mongoose.connect(process.env.MONGO_URI)

    const admin = await (new User({name: 'admin', password: 'admin', type: 'Admin', role: 'Admin'})).save()

    const leader1 = await (new User({name: 'leader1', password: 'pass', type: 'User', role: 'TeamLeader'})).save()
    const member1 = await (new User({name: 'member1', password: 'pass', type: 'User', role: 'TeamMember'})).save()
    const member2 = await (new User({name: 'member2', password: 'pass', type: 'User', role: 'TeamMember'})).save()

    const team1 = await (new Team({name: 'Team1', leader: leader1._id})).save()
    await User.updateOne({name: 'leader1'}, {team: team1._id})
    await User.updateOne({name: 'member1'}, {team: team1._id})
    await User.updateOne({name: 'member2'}, {team: team1._id})

    const tag1 = await (new Tag({name: 'First Tag', team: team1._id}))
    const tag2 = await (new Tag({name: 'Second Tag', team: team1._id}))
    const tag3 = await (new Tag({name: 'Third Tag', team: team1._id}))

    const project1 = await (new Project({
        name: 'Project1',
        description: 'desc1',
        client: 'client1',
        startDate: new Date('2022-12-01'),
        dueDate: new Date('2023-04-01'),
        team: team1._id,
        tags: [tag1._id, tag2._id]
    })).save()

    const project2 = await (new Project({
        name: 'Project2',
        description: 'desc2',
        client: 'client2',
        startDate: new Date('2022-11-01'),
        dueDate: new Date('2023-03-01'),
        team: team1._id,
        tags: [tag3._id]
    })).save()

    const task1 = await (new Task({
        name: 'Task 1',
        start: new Date(),
        end: new Date(),
        project: project1._id,
        user: member1._id,
        tags: [tag1._id, tag2._id]
    })).save()

    const task2 = await (new Task({
        name: 'Task 2',
        start: new Date(),
        end: new Date(),
        project: project1._id,
        user: member1._id,
        tags: [tag3._id, tag2._id]
    })).save()
}
generate().then(() => console.log('DONE')).catch(err => console.error(err)).finally(() => process.exit())
