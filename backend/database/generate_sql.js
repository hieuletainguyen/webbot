const fs = require("fs");

const sqlStatement = [];
sqlStatement.push(`
    CREATE DATABASE IF NOT EXISTS robot_accounts;

    USE robot_accounts;

    CREATE TABLE IF NOT EXISTS accounts (
        id INT AUTO_INCREMENT,
        email VARCHAR(50), 
        password VARCHAR(200),
        PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS tokens (
        id INT AUTO_INCREMENT,
        token VARCHAR(3000),
        PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS images (
        id INT AUTO_INCREMENT,
        email VARCHAR(50),
        image BLOB NOT NULL, 
        time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS videos (
        id INT AUTO_INCREMENT,
        email VARCHAR(50) NOT NULL,
        video LONGBLOB NOT NULL,
        time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS booking_schedule (
        id INT AUTO_INCREMENT,
        email VARCHAR(100) NOT NULL,
        date VARCHAR(50) NOT NULL, 
        time VARCHAR(50) NOT NULL,
        robot_option VARCHAR(100) NOT NULL,
        PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS reset_tokens (
        id INT AUTO_INCREMENT, 
        email VARCHAR(255) DEFAULT NULL, 
        token VARCHAR(255) DEFAULT NULL,
        PRIMARY KEY (id)
    );


`);


fs.writeFileSync("../../mysql-init/init.sql", sqlStatement.join("\n"), 'utf8');

console.log("SQL Script generated done!");
