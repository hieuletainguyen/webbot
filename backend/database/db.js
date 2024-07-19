const { Pool } = require('pg');

require("dotenv").config();

const database = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || "postgres_container",
    database: process.env.DB_NAME || "robot_accounts", 
    password: process.env.DB_PASSWORD || "postgres",
    port: 5432
})

module.exports = database;
