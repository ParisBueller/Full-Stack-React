const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
//we must add our arguments to route handlers IN THE ORDER WE
//WANT THEM TO BE EXECUTED!!
module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {

    });
};