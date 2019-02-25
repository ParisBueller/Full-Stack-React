const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

//connect to our mongo database using mongoose.connect()
mongoose.connect(keys.mongoURI);

const app = express();

//app.use() wires up middleware
//middleware are small functions that can modify incoming requests
//before they are sent off to route handlers
app.use(bodyParser.json());
app.use(
  //cookie-session and express-session are two cookie handlers recommended by express
  //cookie-session: assigns data to a cookie, then takes data out of that cookie
  //and assigns it to req.session property
  //express-session: stores a reference to a session inside the cookie
  cookieSession({
      //maxAge = how long before cookie expires
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //key = used to encrypt our cookie
    keys: [keys.cookieKey] 
  })  
);
app.use(passport.initialize());
app.use(passport.session());

//both route files return a function and are then
//immediately called with the express app object
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//check if our environment is development or production so that
// our routes defined by React Router AND NOT on our express server
//can be handled correctly
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets i.e. main.js, main.css
  app.use(express.static('client/build'));

  //Express will serve up index.html filed if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

//environment variables(process.env) are variables that are set in the underlying runtime.
//to keep hosting in a development environment i.e. local host, we add a boolean statement( || 5000).
const PORT = process.env.PORT || 5000;
app.listen(PORT);