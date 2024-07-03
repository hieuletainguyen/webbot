const { validationResult } = require('express-validator');
const database = require('../database/db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret_data = require("../secret-data");

const jwtSecretKet = secret_data.jwtsecretkey;
const salt = secret_data.salt;

const addAccount = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0){
        res.send(errors.array());
    } else {
        const {username, password} = req.body;

        const hash_password = bcrypt.hash(password, salt)

        const account = {
            username: username,
            password: hash_password
        }

        const unique = "SELECT distinct(username) FROM accounts WHERE username = ?";

        database.query(unique, username, (err, result) => {
            if (err) throw err;

            if (result.length > 0){
                return res.send({message: "username already exists"});
                
            }
        })

        const sqlQuery = 'INSERT INTO accounts SET ?';

        database.query(sqlQuery, account, (err, row) => {
            if (err) throw err;

            res.send({message: "success"});
        });


    }
};

const authorization = (req, res) => {
    const {username, password} = req.body;

    const sqlQuery = "SELECT * FROM accounts WHERE username = ?";

    database.query(sqlQuery, username, (err, result) => {
        if (err) throw err;

        if (result.length === 1 && bcrypt.compare(result[0].password, password)){
            let loginData = {
                username, 
                signInTime: Date.now(),
            }

            const token = jwt.sign(loginData, jwtSecretKet);
            res.status(200).json({message: "success", token})
        } else {
            res.status(400).json({message: "fail"})
        }
    })
};

const checkAccount = (req, res) => {
    const {username} = req.body;

    const sqlQuery = "SELECT * FROM accounts WHERE username = ?";

    database.query(sqlQuery, username, (err, result) => {
        if (err) throw err;

        if (result.length === 0){
            res.json({isExisted: false})
        } else {
            res.json({isExisted: true})
        }

    })
};


module.exports = {
    checkAccount,
    authorization,
    addAccount
}