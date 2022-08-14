const jwt = require("jsonwebtoken");
require("dotenv").config();

const { generateTokens } = require("../helpers/generateTokens.js");

const { REFRESH_KEY } = process.env;

const refreshTokens = (req, res) => {
    // console.log("1", req.cookies);

    const refresh_token = req.cookies.refresh_token;

    console.log("1", refresh_token, REFRESH_KEY);

    if (!refresh_token) return;

    jwt.verify(refresh_token, REFRESH_KEY,(error, user) => {
        console.log("2", user);
        if (error) {
            console.log(error);
            return res.status(403).json({error})
        }


    });
};

module.exports = { refreshTokens };
