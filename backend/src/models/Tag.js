const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        team: {
            type: Schema.Types.ObjectId,
            ref: 'Team',
            required: true
        }
    }, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

TagSchema.index({ name: 1, team: 1 }, { unique: true })

TagSchema.virtual('tasks', {
    localField: '_id',
    ref: 'Task',
    foreignField: 'tags'
})

TagSchema.virtual('projects', {
    localField: '_id',
    ref: 'Project',
    foreignField: 'tags'
})

module.exports = mongoose.model('Tag', TagSchema);