module.exports.token = async (req, res) => {
    res.cookie('token', req.user.token, { httpOnly: true, secure: true })
    res.send({
        auth: true,
        user: req.user.user
    })
}

module.exports.checkAuth = (req, res) => {
    res.send({
        auth: true,
        user: req.user
    })
}

module.exports.logout = (req, res) => {
    res.clearCookie('token').end();
}

const allowOnly = roles => {

    return (req, res, next) => {
        if (!roles.includes(req.authInfo.role)) {
            const error = new Error('Forbidden')
            error.code = 403
            return next(error)
        }
        return next();
    }
}

module.exports.allowOnly = allowOnly;

module.exports.allowAdmin = allowOnly(['Admin'])

module.exports.allowLeader = allowOnly(['Admin', 'TeamLeader'])

module.exports.allowMember = allowOnly(['Admin', 'TeamLeader', 'TeamMember'])