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
                const query_book = "INSERT INTO booking_schedule (username, date, time, robot_option) VALUES (?, ?, ?, ?)";
                database.query(query_book, [decode.username, date, time, robot], (err, result) => {
                    if (err) throw err;
                    res.status(200).json({ message: "Booking Success" });
                })

            }
        })
    }

}

const myBookedTimeSlot = (req, res) => {
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
                const query_book = "SELECT * FROM booking_schedule WHERE username = ?";
                database.query(query_book, [decode.username], (err, result) => {
                    if (err) throw err;
                    res.status(200).json({ final_result: result });
                })

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
    myBookedTimeSlot
}