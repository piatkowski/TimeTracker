module.exports.token = async (req, res, next) => {
    res.send(req.user)
}

module.exports.allowOnly = allowedScopes => {

    return (req, res, next) => {
        if(!allowedScopes.includes(req.authInfo.scope)) {
            const error = new Error('Forbidden')
            error.code = 403
            return next(error)
        }
        return next();
    }

}