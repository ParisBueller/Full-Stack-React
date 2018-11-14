const express = require('express');
const app = express();

//by calling .get() we are creating a new route handler
//in this case, requests trying to access '/'
app.get('/', (req, res) => {
    res.send({ hi: 'there' });
});

//whenever Heroku runs our app, it has the ability to inject environment variables(provess.env).
//environment variables are variables that are set in the underlying runtime that node runs on top of.
//to keep hosting in a development environment i.e. local host, we add a boolean statement
const PORT = process.env.PORT || 5000;
//.listen() instructs express to tell node to listen
//for incoming traffic on the specified port 
app.listen(PORT);