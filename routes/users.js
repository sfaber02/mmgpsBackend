const express = require('express');
const users = express.Router();

const { register } = require('../controllers/register.js');
const { login } = require('../controllers/login.js');
const { refreshTokens } = require('../controllers/refreshToken.js');


// const res = require('express/lib/response');

users.get ('/', (req, res) => res.send('GET ALL USERS TEST'));

users.get('/refresh_token', refreshTokens);

users.post('/register', register);

users.post('/login', login);



module.exports = users;