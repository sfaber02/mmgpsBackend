const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'https://mmgps.netlify.app',
    methods: ['GET', 'POST'],
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log ('HELLO');
    res.header('Access-Control-Allow-Origin', ['*']);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const usersController = require('./routes/users.js');
app.use('/users', usersController);

app.get('/', (req, res) => {
    res.send('Welcome to the user Auth backend');
});

app.get('*', (req, res) => {
    res.status(404).send('Page not found.');
})



module.exports = app;