const mysql = require('mysql2');
const {default_user, default_password, default_database, default_host} = require("../secret-data");

require("dotenv").config();

const database = mysql.createConnection({
    user: process.env.DB_USER || default_user,
    host: process.env.DB_HOST || default_password,
    database: process.env.DB_NAME || default_database, 
    password: process.env.DB_PASSWORD || default_host
})

module.exports = database;
