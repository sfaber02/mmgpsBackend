const jwt = require("jsonwebtoken");
require("dotenv").config();

const { generateTokens } = require("../../helpers/generateTokens.js");

const { REFRESH_KEY } = process.env;

const refreshTokens = (req, res) => {
    const refresh_token = req.cookies.refresh_token;

    if (!refresh_token) return;

    jwt.verify(refresh_token, REFRESH_KEY,(error, user) => {
        if (error) {
            return res.status(403).json({error})
        }

        const tokens = generateTokens({
            user_id: user.user_id,
            username: user.username,
            email: user.email,
        });

        res.cookie("refresh_token", tokens.refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        res.status(200).json(tokens); 
    });
};

module.exports = { refreshTokens };
