const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            index: { unique: true }
        },
        description: {
            type: String
        },
        client: {
            type: String
        },
        startDate: {
            type: Date,
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        },
        team: {
            type: Schema.Types.ObjectId,
            ref: 'Team',
            required: true
        },
        tags: [{
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }]
    }, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

ProjectSchema.virtual('users', {
    localField: 'team',
    ref: 'User',
    foreignField: 'team'
})

ProjectSchema.virtual('tasks', {
    localField: '_id',
    ref: 'Task',
    foreignField: 'project'
})

module.exports = mongoose.model('Project', ProjectSchema);