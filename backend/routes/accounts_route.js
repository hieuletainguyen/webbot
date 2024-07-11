const express = require('express');
const router = new express.Router();
const account = require('../controllers/accounts')
const {body} =  require('express-validator');


router.post("/add-account", 
    body("username").not().isEmpty().escape(),
    body("password").not().isEmpty().escape(),
    account.addAccount
)

router.post("/auth", 
    body("username").not().isEmpty().escape(),
    body("password").not().isEmpty().escape(),
    account.authorization
)

router.post('/logout',
    body("username").not().isEmpty().escape(), 
    account.logout
)

router.post("/auth_token", 
    account.decode_token
)

module.exports = router;

