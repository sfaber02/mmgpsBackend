const bcrypt = require("bcrypt");
const db = require("../db/dbConfig.js");
const jwt = require("jsonwebtoken");
const { getUser } = require("../queries/userQueries.js");
const { generateTokens } = require("../helpers/generateTokens.js");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUser(email);
        if (!user) {
            res.status(400).json({
                error: "User not registered.  Please register first",
            });
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(500).json({ error: "Password decrypt error." });
                } else if (result) {
                    const tokens = generateTokens(user);
                    res.cookie("refresh_token", tokens.refreshToken, {
                        httpOnly: true,
                        sameSite: "none",
                        secure: true,
                    });
                    res.status(200).json(tokens);
                } else {
                    res.status(400).json({
                        error: "Incorrect Password",
                    });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = { login };
