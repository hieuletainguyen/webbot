const express = require('express');
const init = require("../controllers/init");
const {body} = require("express-validator");
const router = new express.Router();

router.get("/", (req, res) => {
    res.status(200).json({message: "Testing connection complete"});
}
)


module.exports = router;
