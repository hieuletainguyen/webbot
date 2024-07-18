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
                const query_book = "INSERT INTO booking_schedule (username, date, time, robot_option) VALUES (?, TO_DATE(?, 'YYYY-MM-DD'), ?, ?)";
                database.query(query_book, [decode.username, date, time, robot], (err, result) => {
                    if (err) throw err;
                    res.status(200).json({ message: "Booking Success" });
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
        const stringDate = req.params.date;

        const query = "SELECT time, string_agg(robot_option, ',') AS robot_options FROM booking_schedule WHERE date = ? GROUP BY time";
        database.query(query, [stringDate], (err, result) => {
            if (err) throw err;

            if (result.length > 0){
                const final_result = {};
                result.forEach((element) => {
                    final_result[element.time] = element.robot_options;
                });
                res.status(200).json(final_result);
            }  else {
                res.status(200).json({});
            }
        })

    }
}




module.exports = {
    bookRobot,
    bookedTimeSlot
}