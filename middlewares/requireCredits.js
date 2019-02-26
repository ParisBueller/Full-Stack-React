module.exports = (req, res, next) => {
    //check if user has enough credits for a survey
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits!'});
    }
    //if they have sufficient credits, proceed to the request handler
    next();
};