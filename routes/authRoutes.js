const express = require('express');
const authController = require('../controller/authController.js');


const routes = express.Router();

routes.get('/signup', authController.signup_get);

routes.post('/signup', authController.signup_post);

routes.get('/login', authController.login_get);

routes.post('/login', authController.login_post);

module.exports = routes;

