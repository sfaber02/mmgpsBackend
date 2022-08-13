const jwt = require("jsonwebtoken");

const generateTokens = (user) => {
    const accessToken = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: "2hr",
    });

    const refreshToken = jwt.sign(user, process.env.REFRESH_KEY, {
        expiresIn: "7d",
    });

    return { accessToken, refreshToken };
};

module.exports = { generateTokens };
