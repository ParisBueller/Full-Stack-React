const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

//we must add our arguments to route handlers IN THE ORDER WE
//WANT THEM TO BE EXECUTED!!
module.exports = app => {
    // vote redirect
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    });
    
    //post request to send emails
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
           title,
           subject,
           body,
           recipients: recipients.split(',').map( email => ({ email: email.trim() })),
           _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            //await our emails to be sent
            await mailer.send();
            //save the survey to the database
            await survey.save();
            //subtract credits from the user
            req.user.credits -= 1;
            //save the users new info i.e. new credit count
            const user = await req.user.save();
            //send back user model to indicate new credit count
            res.send(user);
        } catch (err) {
            //422 = unprocessable entity i.e. you did something wrong
            res.status(422)
        }
    });
};