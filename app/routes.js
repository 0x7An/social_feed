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

// User
routes.put('/users', controllers.userController.update);

// Tweets
routes.post('/tweets', controllers.tweetController.create);
routes.delete('/tweets/:id', controllers.tweetController.destroy);

// Follow
routes.post('/follow/:id', controllers.followController.follow);
routes.delete('/unfollow/:id', controllers.followController.unfollow);

// Likes
routes.post('/like/:id', controllers.likeController.toogle);

module.exports = routes;
