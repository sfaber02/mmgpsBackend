const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    doesEmailExist,
    doesUsernameExist,
    addUser,
} = require("../queries/userQueries.js");

const { generateTokens } = require("../helpers/generateTokens.js");

const register = async (req, res) => {
    console.log("REGISTER ENDPOINT");

    const { name, email, password } = req.body;

    try {
        //check if email is in use
        if (await doesEmailExist(email)) {
            res.status(400).json({
                error: "User with that email already exists.",
            });
            return;
        }

        //check if username is in use
        if (await doesUsernameExist(name)) {
            res.status(400).json({
                error: "User with that username already exists.",
            });
            return;
        }

        // hash password / post user to DB / generate JWT tokens / send response
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                res.status(err).json({ error: "Bcrypt Error" });
                return;
            } else {
                try {
                    const newUser = await addUser(name, email, hash);

                    if (newUser) {
                      //if DB post successful generate JWTs
                        const tokens = generateTokens(newUser);

                        res.cookie("refresh_token", tokens.refreshToken, {
                          httpOnly: true,
                          sameSite: "none",
                          secure: true,
                        });

                        res.status(200).json(tokens);

                    } else {
                        res.status(500).json({
                            error: "Failed to Post User to DB",
                        });
                    }
                } catch (err) {
                    res.status(500).json({
                        error: "Failed to Generate Tokens",
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).json({error: error});
    }
};

module.exports = { register };
