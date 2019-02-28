const sendgrid = require('sendgrid');
const helper = sendgrid.mail;

const keys = require('../config/keys');

//Reusable mailer class to specify to sendgrid 
//what to send and who to send it to
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();
        //sendgrid specific constructor setup
        //specify our sendgrid api from keys directory
        this.sgApi = sendgrid(keys.sendGridKey);
        //specify who the recipient is receiving this email from
        this.from_email = new helper.Email('no-reply@emaily.com');
        //specify the subject of the email
        this.subject = subject;
        //specify what is to appear in the body of the email
        this.body = new helper.Content('text/html', content);
        //specify list of recipients
        this.recipients = this.formatAddresses(recipients);

        //addContent is a built in function from helper,adds the body content
        this.addContent(this.body);

        //helper function that enables click-tracking inside our email 
        this.addClickTracking()
        //helper function that processes our list of recipients
        this.addRecipients();
    }
    //helper function that extracts each email from
    //our list of recipients and formats it with
    //sendgrids helper.Email(email)
    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }
    //helper function that adds click tracking to our email
    //TrackingSettings(), ClickTracking() are both built in
    //to helper from sendgrid
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }
    //helper function that processes our list of recipients
    //iterate over our list of recipients and for each recipient
    //take them and add them to our defined personalize object
    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }
    //send our emails!
    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = this.sgApi.API(request);
        return response
    }
}

module.exports = Mailer;