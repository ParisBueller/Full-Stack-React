const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
//for all route handlers, the first argument is the route
//second argument is the function to be executed whenever route is accessed
app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    //once done authenticating, redirect the user to /surveys route
    (req, res) => {
        res.redirect('/surveys');
        }
    );

app.get('/api/logout', (req, res) => {
    //logout is a function automatically attached 
    //to the request(req) object by passport
    req.logout();
    res.redirect('/');
});

app.get('/api/current_user', (req, res) => {
    res.send(req.user);
    });
};