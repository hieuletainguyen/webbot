const { validationResult } = require('express-validator');
const database = require('../database/db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {jwtSecretkey, generate_salt, myEmail} = require("../secret-data");
const transport = require("../database/host_email")
const {sendEmail} = require("../database/host_email")

const addAccount = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const salt = await generate_salt();
        const hash_password = await bcrypt.hash(password, salt);

        const uniqueQuery = "SELECT distinct(email) FROM accounts WHERE email = ?";
        database.query(uniqueQuery, email, (err, result) => {
            if (err) throw err
            console.log(result);
            if (result.length > 0) {
                return res.status(400).json({ message: "email already exists" });
            } else {
                const insertQuery = "INSERT INTO accounts (email, password) VALUES (?, ?)";
                database.query(insertQuery, [email, hash_password], (err, result) => {
                    return res.status(200).json({message: "success"});
                });
                
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server Error" });
    }
};

const authorization = async (req, res) => {
    const {email, password} = req.body;

    const sqlQuery = "SELECT * FROM accounts WHERE email = ?";

    database.query(sqlQuery, [email], async (err, result) => {
        if (err) {
            return res.status(500).send({message: "Server Error"});
        };

        if (result.length === 1){

            const hashedPassword = result[0].password;
    
            const match = await bcrypt.compare(password, hashedPassword);
            
    
            if (match)   {
            
                const token = jwt.sign({email: email}, jwtSecretkey, {expiresIn: "1h"});

                const query1 = "INSERT INTO tokens (token) VALUES (?)";

                database.query(query1 , token, (err, result) => {
                    if (err) throw err;
                    // res.cookie("ROBOT_TOKENS", token, {maxAge: 900000});
                    res.status(200).json({message: "success", token: token})
                    

                })

            } else {
                res.status(401).json({message: "Invalid email or password", final_result: match});
            }
    
        } else {
            res.status(401).json({message: "Invalid email or password", final_result: result})
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

                    if (result.rowCount === 1) {
                        res.status(200).json({message: "success", email: decoded.email})
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
    const {email} = req.body;

    const sqlQuery = "SELECT * FROM accounts WHERE email = ?";

    database.query(sqlQuery, email, (err, result) => {
        if (err) throw err;

        if (result.length === 0){
            res.json({isExisted: false})
        } else {
            res.json({isExisted: true})
        }

    })
};

const forgotPassword = (req, res) => {
    const email = req.body.email;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        const sqlQuery = "SELECT * FROM accounts WHERE email = ?";
        database.query(sqlQuery, [email], (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                res.json({message: "Email not found!"})
            } else {
                const token = jwt.sign({email: email}, jwtSecretkey, {expiresIn: "1h"});

                const message = {
                    from: myEmail,
                    to: email,
                    subject: "Reset Password",
                    text: `Please click on the link to reset your password: \n
                    ${process.env.FRONTEND_URL}/reset-password?token=${encodeURIComponent(token)}&email=${email}`
                }

                console.log(result);

                sendEmail(message)

                res.status(200).json({message: "send recover email successfully", allowedToReset: true})
            }

        })
    }
}

const resetPassword = (req, res) => {
    console.log(req.body)
    const {email, password, token} = req.body;
    const decode = jwt.verify(token, jwtSecretkey);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        const query_auth = "SELECT * FROM accounts WHERE email = ?";
        database.query(query_auth, [decode.email], async (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const salt = await generate_salt();
                const hash_password = await bcrypt.hash(password, salt);
                const query_insert = "UPDATE accounts SET password = ? WHERE email = ?";
                database.query(query_insert, [hash_password, decode.email], (err, result) => {
                    if (err) throw err;
                    console.log(result)
                    res.status(200).json({message: "Update password completed"})

                })
            }
        })

    }

}

module.exports = {
    checkAccount,
    authorization,
    addAccount, 
    logout, 
    decode_token ,
    forgotPassword, 
    resetPassword
}