const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY, REFRESH_KEY } = process.env;

const generateTokens = (user) => {
    const accessToken = jwt.sign(user, SECRET_KEY, {
        expiresIn: "2hr",
    });

    const refreshToken = jwt.sign(user, REFRESH_KEY, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToken };
};

module.exports = { generateTokens };
