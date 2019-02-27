const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');

//we must add our arguments to route handlers IN THE ORDER WE
//WANT THEM TO BE EXECUTED!!
module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
           title,
           subject,
           body,
           recipients: recipients.split(',').map( email => ({ email: email.trim() })),
           _user: req.user.id,
            dateSent: Date.now()
        });
    });
};