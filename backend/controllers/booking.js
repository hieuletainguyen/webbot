const { validationResult } = require('express-validator');
const database = require("../database/db");
const jwt = require("jsonwebtoken")
const {jwtSecretkey } = require("../secret-data");

const bookRobot = (req, res) => {
    const errors = validationResult(req);
    const {token, date, time, robot} = req.body;
    const decode = jwt.verify(token, jwtSecretkey);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        const query_auth = "SELECT * FROM accounts WHERE username = ?";
        database.query(query_auth, [decode.username], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const booked_timeslot = "SELECT * FROM booking_schedule WHERE username = ? AND date = ? AND time = ?";
                database.query(booked_timeslot, [decode.username, date, time], (err, result) => {
                    if (err) throw err;

                    if (result.length === 0) {
                        const query_book = "INSERT INTO booking_schedule (username, date, time, robot_option) VALUES (?, ?, ?, ?)";
                        database.query(query_book, [decode.username, date, time, robot], (err, result) => {
                            if (err) throw err;
                            res.status(200).json({ message: "Booking Success" });
                        })
                    } else {
                        res.status(400).json({ message: "Must only one slot" });
                    }

                })

                

            }
        })
    }

}

const myBookedTimeSlot = (req, res) => {
    const errors = validationResult(req);
    const token = req.query.token;
    const decode = jwt.verify(token, jwtSecretkey);
    console.log("received")

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        const query_auth = "SELECT * FROM accounts WHERE username = ?";
        database.query(query_auth, [decode.username], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const query_book = "SELECT * FROM booking_schedule WHERE username = ?";
                database.query(query_book, [decode.username], (err, result) => {
                    if (err) throw err;
                    console.log(result)
                    res.status(200).json({ final_result: result });
                })
                

            } else {
                res.status(400).json({ final_result: [] });
            }
        })
    }
}

const cancelMyBookedTime  = (req, res) => {
    const errors = validationResult(req);
    const token = req.query.token;
    const date = req.query.date;
    const time = req.query.time;
    const robot_option = req.query.robot_option;
    const decode = jwt.verify(token, jwtSecretkey);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        const query_auth = "SELECT * FROM accounts WHERE username = ?";
        database.query(query_auth, [decode.username], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const query_book = "DELETE FROM booking_schedule WHERE username = ? AND date = ? AND time = ? AND robot_option = ?";
                database.query(query_book, [decode.username, date, time, robot_option], (err, result) => {
                    if (err) throw err;
                    res.status(200).json({message: "delete success"})
                })
                

            } else {
                res.status(400).json({ message: "something wrong"});
            }
        })
    }
}

const bookedTimeSlot = (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        const stringDate = req.query.date;
        const stringTime = req.query.time;
        console.log(stringDate);
        console.log(stringTime)

        const query = "SELECT time, robot_option FROM booking_schedule WHERE date = ? AND time = ?";
        database.query(query, [stringDate, stringTime], (err, result) => {
            if (err) throw err;
            if (result.length > 0){
                const lst = [];
                console.log(result);
                result.forEach((element) => lst.push(element.robot_option));
                console.log(result);
                console.log(lst)
                res.status(200).json({final_result: lst});
            }  else {
                res.status(200).json({final_result: []})
            }
        })

    }
}




module.exports = {
    bookRobot,
    bookedTimeSlot, 
    myBookedTimeSlot, 
    cancelMyBookedTime
}