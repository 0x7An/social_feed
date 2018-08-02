const express = require('express');
const requireDir = require('require-dir');

const controllers = requireDir('./controllers');
const routes = express.Router();

routes.post('/signup', controllers.authController.signup);

module.exports = routes;
