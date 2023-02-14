const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        tags: [{
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }]
    }
);

module.exports = mongoose.model('Task', TaskSchema);