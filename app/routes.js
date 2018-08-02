const express = require('express');
const requireDir = require('require-dir');

const controllers = requireDir('./controllers');
const routes = express.Router();

// Auth
routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

module.exports = routes;
