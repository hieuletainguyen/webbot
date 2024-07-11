const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const controll = require('../controllers/controll');


router.post("/arm-data", 
    controll.movement
)

module.exports = router;

