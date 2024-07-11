const { validationResult } = require('express-validator');
const database = require("../database/db");

let armData;

const movement = (req, res) => {
    const errors = validationResult(req);

    if (errors.array().length > 0) {
        res.send(errors.array());
    } else {
        console.log(req.body)
        armData = req.body;
        return res.status(200).send({ message: "new orientation received"})
    }
}

const getArmData = (req, res) => {
    res.send(armData);
}

module.exports = {
    movement, 
    getArmData
}