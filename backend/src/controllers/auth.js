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

module.exports.allowOnly = allowedScopes => {

    return (req, res, next) => {
        if (!allowedScopes.includes(req.authInfo.scope)) {
            const error = new Error('Forbidden')
            error.code = 403
            return next(error)
        }
        return next();
    }

}