const _ = require('lodash');
const Path  = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

//we must add our arguments to route handlers IN THE ORDER WE WANT THEM TO BE EXECUTED!!
module.exports = app => {
    //vote redirect
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    //webhook post route for clicked email notification
    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        //iterate over our req.body(list of events)
        //extract the pathname/survey id and choice(yes/no) from the URL
        //remove undefined and duplicate elements
        _.chain(req.body)
            .map(({ email, url }) => {
             
            const match = p.test(new URL(url).pathname);
            if (match) {
                return { email, surveyId: match.surveyId, choice: match.choice };
            }
        })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    //find the survey with a corresponding id
                    _id: surveyId,
                    //match the recipient subdocument within that id
                    recipients: {
                        $elemMatch: { email: email, responded : false }
                        }
                    }, 
                    {
                    //$inc is a mongo operator that allows us to find
                    //in this case find the 'choice' property and increment it
                    $inc: {  [choice]: 1 },
                    //$set will set the recipient responded in mongo to true
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec()
            })
            .value();

        res.send({});
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