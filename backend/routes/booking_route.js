const express = require("express");
const router = express.Router();
const {body} = require("express-validator")
const booking = require("../controllers/booking");

router.post("/book-robot", 
    body("token").not().isEmpty(), 
    body("date").not().isEmpty(),
    body("time").not().isEmpty(),
    body("robot").not().isEmpty(),
    booking.bookRobot
)

router.get("/booked-timeslots", 
    booking.bookedTimeSlot
)


module.exports = router;