const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            index: { unique: true }
        },
        leader: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }, {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

TeamSchema.virtual('users', {
    localField: '_id',
    ref: 'User',
    foreignField: 'team'
})

TeamSchema.virtual('projects', {
    localField: '_id',
    ref: 'Project',
    foreignField: 'team'
})

module.exports = mongoose.model('Team', TeamSchema);