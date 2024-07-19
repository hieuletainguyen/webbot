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
        const query_auth = "SELECT * FROM accounts WHERE username = $1";
        database.query(query_auth, [decode.username], (err, result) => {
            if (err) throw err;

            if (result.rowCount === 1) {
                const query_book = "INSERT INTO booking_schedule (username, date, time, robot_option) VALUES ($1, TO_DATE($2, 'YYYY-MM-DD'), $3, $4)";
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
        const stringDate = req.query.date;
        console.log(stringDate);

        const query = "SELECT time, string_agg(robot_option, ',') AS robot_options FROM booking_schedule WHERE date = $1 GROUP BY time";
        database.query(query, [stringDate], (err, result) => {
            if (err) throw err;
            if (result.rowCount > 0){
                const final_result = {};
                result.rows.forEach((element) => {
                    final_result[element.time] = element.robot_options;
                });

                Object.keys(final_result).forEach((key) => {
                    final_result[key] = final_result[key].split(',');
                })
                
                res.status(200).json(final_result);
            }  
        })

    }
}




module.exports = {
    bookRobot,
    bookedTimeSlot
}