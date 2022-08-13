const express = require('express');
const cors = require('cors');

const usersController = require('./routes/users.js');

const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:5555" || "*"
}));

app.use(express.json());

// app.use((req, res, next) => {
//     console.log ('HELLO');
//     res.header('Access-Control-Allow-Origin', ['*']);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.use('/users', usersController);


app.get('*', (req, res) => {
    res.status(404).send('Page not found.');
})

module.exports = app;