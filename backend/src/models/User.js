const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {hash} = require("bcrypt");

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    token: {
        type: String,
        select: false
    },
    type: {
        type: String,
        enum: ['Admin', 'User'],
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'TeamLeader', 'TeamMember'],
        required: true
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

UserSchema.virtual('projects', {
    localField: 'team',
    ref: 'Project',
    foreignField: 'team'
})

UserSchema.virtual('tasks', {
    localField: '_id',
    ref: 'Task',
    foreignField: 'user'
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        this.password = await bcrypt.hash(this.password, process.env.SALT_ROUNDS || 10)
        next()
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.checkPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (err) {
        return false
    }
}

UserSchema.methods.regenerateToken = async function () {
    const token = await require('crypto').randomBytes(32)
    this.token = token.toString('hex')
    this.save()
    return this.token
}

module.exports = mongoose.model('User', UserSchema);