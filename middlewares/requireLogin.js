module.exports = (req, res, next) => {
    //if user is not logged in, through for(forbidden)  error
    if (!req.user) {
        return res.status(401)({ error: 'You must log in!'});
    }
    //if they are logged in, proceed to the request handler
    next();
};