const express = require('express');
const init = require("../controllers/init");
const router = new express.Router();


router.post("/", async (req, res) => {
    res.status(200).json({message: "Testing connection complete"});
}
)


module.exports = router;
