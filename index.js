const express = require('express');
require('./services/passport');

const app = express();

require('./routes/authRoutes')(app);

//environment variables(process.env) are variables that are set in the underlying runtime.
//to keep hosting in a development environment i.e. local host, we add a boolean statement( || 5000).
const PORT = process.env.PORT || 5000;
app.listen(PORT);