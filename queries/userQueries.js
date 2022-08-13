const db = require("../db/dbConfig.js");

const doesEmailExist = async (email) => {
    try {
        const exists = await db.any(
            `SELECT EXISTS (SELECT 1 FROM users WHERE email='${email}');`
        );
        return exists[0].exists;
    } catch (error) {
        return error;
    }
};

const doesUsernameExist = async (username) => {
    try {
        const exists = await db.any(
            `SELECT EXISTS (SELECT 1 FROM users WHERE username='${username}');`
        );
        return exists[0].exists;
    } catch (error) {
        return error;
    }
};

const addUser = async (name, email, password) => {
    try {
        const newUser = await db.one(
            `
                INSERT INTO users (username, email, password)
                VALUES ($1, $2, $3)
                RETURNING user_id, username, email;
            `,
            [name, email, password]
        );
        return newUser;
    } catch (err) {
        return err;
    }
};

const getUser = async (email) => {
    try {
        const result = await db.query(
            `
                SELECT * FROM users WHERE email='${email}';
            `
        );
        return result[0];
    } catch (err) {
        
        return err;
    }
};

module.exports = {
    doesEmailExist,
    doesUsernameExist,
    addUser,
    getUser,
};
