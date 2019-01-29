const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

//serializeUser will generate an identifying piece of info to be set
//in a cookie for the user to use while they navigate around the site
//serializeUser takes a callback with two arguments, our user model and done argument
passport.serializeUser((user, done) => {
    //user.id IS NOT the profile.id,it is a unique identifier
    //assigned by mongo when the record was created
    done(null, user.id);
});

//deserializeUser takes a callback with arguments id and done
//deserializeUser turns the id back into a mongoose model instance
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    (accessToken, refreshToken, profile, done) => {
        //.findOne is a mongoose method used to find one specific document
        User.findOne({ googleId: profile.id })
            .then( existingUser => {
                //we already have a user with the given id
                if (existingUser) {
                    //done expects two arguments, null and user record
                    done(null,existingUser);
                } else {
                    //we do not have a record for this user, make a new record
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            });
        }
    )
);
