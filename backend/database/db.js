const { Client } = require('pg');

require("dotenv").config();

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || "postgres-container",
    database: process.env.DB_NAME || "robot_accounts", 
    password: process.env.DB_PASSWORD || "postgres",
    port: 5432
})

module.exports = client;
