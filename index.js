const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

//connect to our mongo database using mongoose.connect()
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
      //maxAge = how long before cookie expires
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //key = used to encrypt our cookie
    keys: [keys.cookieKey] 
  })  
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

//environment variables(process.env) are variables that are set in the underlying runtime.
//to keep hosting in a development environment i.e. local host, we add a boolean statement( || 5000).
const PORT = process.env.PORT || 5000;
app.listen(PORT);