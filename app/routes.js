const express = require('express');
const requireDir = require('require-dir');

const controllers = requireDir('./controllers');
const routes = express.Router();

const authMidleware = require('./midlewares/auth');

// Auth
routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

// Auth Routes
routes.use(authMidleware);

// Tweets
routes.post('/tweets', controllers.tweetController.create);
routes.delete('/tweets/:id', controllers.tweetController.destroy);

routes.get('/tweets', (req, res) => res.send('OK'));

module.exports = routes;
