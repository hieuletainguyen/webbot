const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const controll = require('../controllers/controll');


router.post("/arm-data", 
    controll.movement
)

router.get("/get-arm-data",
    controll.getArmData
)

module.exports = router;

