const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const usersController = require("./routes/users.js");

const app = express();

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000" || "*",
    })
);

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", ["*"]);
    // //     // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // //     // res.header('Access-Control-Allow-Headers', 'Content-Type');
    // res.header("Access-Control-Allow-Headers", "Content-Type");
    // res.header("Access-Control-Allow-Credentials", true);
    // res.header("Access-Control-Allow-Credentials", true);
    // res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header(
    //     "Access-Control-Allow-Methods",
    //     "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
    // );
    // res.header(
    //     "Access-Control-Allow-Headers",
    //     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    // );

    next();
});

app.use("/users", usersController);

app.get("*", (req, res) => {
    res.status(404).send("Page not found.");
});

module.exports = app;
