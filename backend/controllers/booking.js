const { validationResult } = require('express-validator');
const database = require("../database/db");
const jwt = require("jsonwebtoken")
const {jwtSecretkey } = require("../secret-data");

const validTime = ["9:00 AM","11:00 AM", "1:00 PM","3:00 PM","5:00 PM","7:00 PM"];
const validRobotOption = ["robot_1", "robot_2", "robot_3", "robot_4", "robot_5", "robot_6"];

const bookRobot = (req, res) => {
    const errors = validationResult(req);
    const {token, date, time, robot} = req.body;
    const decode = jwt.verify(token, jwtSecretkey);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        const query_auth = "SELECT * FROM accounts WHERE email = ?";
        database.query(query_auth, [decode.email], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                if (validTime.includes(time) && validRobotOption.includes(robot)){ 
                    const query_book = ` INSERT INTO booking_schedule (email, date, time, robot_option) 
                                            SELECT ?, ?, ?, ? 
                                            FROM DUAL
                                            WHERE NOT EXISTS (
                                                SELECT 1
                                                FROM booking_schedule
                                                WHERE email = ? AND date = ? AND time = ?
                                            )`;

                    database.query(query_book, [decode.email, date, time, robot, decode.email, date, time], (err, result) => {
                        if (err) throw err;

                        res.status(200).json({ message: "Booking Success" });

                    })
                } else {
                    res.status(400).json({ message: "Invalid Time or Robot Option" });
                }
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
        const query_auth = "SELECT * FROM accounts WHERE email = ?";
        database.query(query_auth, [decode.email], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const query_book = "SELECT * FROM booking_schedule WHERE email = ?";
                database.query(query_book, [decode.email], (err, result) => {
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
        const query_auth = "SELECT * FROM accounts WHERE email = ?";
        database.query(query_auth, [decode.email], (err, result) => {
            if (err) throw err;

            if (result.length === 1) {
                const query_book = "DELETE FROM booking_schedule WHERE email = ? AND date = ? AND time = ? AND robot_option = ?";
                database.query(query_book, [decode.email, date, time, robot_option], (err, result) => {
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