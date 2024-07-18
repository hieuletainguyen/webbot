const { validationResult } = require('express-validator');
const database = require('../database/db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {jwtSecretkey, generate_salt} = require("../secret-data");



const addAccount = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
        const salt = await generate_salt();
        const hash_password = await bcrypt.hash(password, salt);

        const uniqueQuery = "SELECT COUNT(*) FROM accounts WHERE username = $1";
        const uniqueResult = await pool.query(uniqueQuery, [username]);

        if (uniqueResult.rows[0].count > 0) {
            return res.status(409).send({ message: "Username already exists" });
        } else {
            const insertQuery = "INSERT INTO accounts (username, password) VALUES ($1, $2)";
            await pool.query(insertQuery, [username, hash_password]);
            res.send({ message: "Success" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error" });
    }
};

const authorization = async (req, res) => {
    const {username, password} = req.body;

    const sqlQuery = "SELECT * FROM accounts WHERE username = ?";

    database.query(sqlQuery, [username], async (err, result) => {
        if (err) {
            return res.status(500).send({message: "Server Error"});
        };

        if (result.length === 1){

            const hashedPassword = result[0].password;
    
            const match = await bcrypt.compare(password, hashedPassword);
    
            if (match)   {
            
                const token = jwt.sign({username: username}, jwtSecretkey, {expiresIn: "1h"});

                const query1 = "INSERT INTO tokens (token) VALUES (?)";

                database.query(query1 , [token], (err, result) => {
                    if (err) throw err;

                    // res.cookie("ROBOT_TOKENS", token, {maxAge: 900000});
                    res.status(200).json({message: "success", token: token})
                    

                })

            } else {
                res.status(401).json({message: "Invalid username or password"});
            }
    
        } else {
            res.status(401).json({message: "Invalid username or password"})
        }

    });
    
};

const decode_token = (req, res) => {
    const {token} = req.body;
    if (token) {
        jwt.verify(token, jwtSecretkey, (err, decoded) => {
            if (err) {
                res.status(401).json({message: "Invalid token"})
            } else {

                const query = "SELECT * FROM tokens WHERE token = ?";
                database.query(query, [token], (err, result) => {
                    if (err) throw err;

                    if (result.length === 1) {
                        res.status(200).json({message: "success", username: decoded.username})
                    } else {
                        res.status(401).json({message: "Invalid token"})
                    }
                })
            }
        })
    }
};

const logout = (req, res) => {
    const {token} = req.body;

    if (token) {
        const query = "DELETE FROM tokens WHERE token = ?";
        database.query(query, [token], (err, result) => {
            if (err) {
                return res.status(500).send({message: "Server Error"});
            };
        });
        res.clearCookie("ROBOT_TOKENS");
        res.status(200).json({message: "Logged out successfully"});
    }
    
}

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
    addAccount, 
    logout, 
    decode_token
}