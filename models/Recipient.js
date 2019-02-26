const mongoose = require('mongoose');
const { Schema } = mongoose;

//recipient Schema is a subdocument collection of Surveys
const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

//with a subdocument, rather than registering the schema
//with mongoose we export it, then import it in our associated model(Survey.js)
module.exports = recipientSchema;