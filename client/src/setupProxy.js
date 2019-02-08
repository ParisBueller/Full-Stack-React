//setup proxy is a way to use relative links on the front end i.e. /auth/google
//and not have to worry about the domain by forwarding request to our back end
//express server. In production, we DO NOT need to change the target: to
//our deployed domain because in production, react's development server doesn't exist

const proxy = require('http-proxy-middleware');
 
module.exports = function(app) {
    app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/*', { target: 'http://localhost:5000' }));
};