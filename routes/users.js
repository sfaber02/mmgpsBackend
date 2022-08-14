const express = require('express');
const users = express.Router();

const { register } = require('../controllers/users/register.js');
const { login } = require('../controllers/users/login.js');
const { refreshTokens } = require('../controllers/users/refreshToken.js');
const { logout } = require('../controllers/users/logout.js')


// const res = require('express/lib/response');

users.get ('/', (req, res) => res.send('GET ALL USERS TEST'));

users.get('/refresh_token', refreshTokens);

users.post('/register', register);

users.post('/login', login);

users.post('/logout', logout);



module.exports = users;