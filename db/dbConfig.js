const pgp = require("pg-promise")();
require('dotenv').config();


const {DATABASE_URL, PG_HOST, PG_PORT, PG_DATABASE, PG_USER} = process.env;

let cn = {};
//FOR PRODUCTION
if (process.env.DATABASE_URL) {
    //production mode - links to heroku psql
    cn = {
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    }
} else {
    //DEVELOPMENT mode links to local psql
    cn = {
        host: PG_HOST,
        port: PG_PORT,
        database: PG_DATABASE,
        user: PG_USER,
        // password: process.env.PG_PASSWORD,
    }
}

const db = pgp(cn);


module.exports = db;