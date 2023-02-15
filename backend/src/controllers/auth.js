module.exports.token = async (req, res) => {
    res.cookie('token', req.user.token, {httpOnly: true, secure: true})
    res.send({ success: true })
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