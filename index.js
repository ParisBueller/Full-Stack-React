const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    accessToken => {
        console.log(accessToken);
    }
  )
);

app.get(
    '/auth/google',
     passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback', passport.authenticate('google'));

//environment variables(process.env) are variables that are set in the underlying runtime.
//to keep hosting in a development environment i.e. local host, we add a boolean statement( || 5000).
const PORT = process.env.PORT || 5000;
app.listen(PORT);