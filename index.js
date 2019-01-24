const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

require('./routes/authRoutes')(app);

//environment variables(process.env) are variables that are set in the underlying runtime.
//to keep hosting in a development environment i.e. local host, we add a boolean statement( || 5000).
const PORT = process.env.PORT || 5000;
app.listen(PORT);