const express = require('express');
const router = new express.Router();
const account = require('../controllers/accounts')
const {body} =  require('express-validator');


router.post("/add-account", 
    body('email').isEmail(),
    body("password").not().isEmpty().escape(),
    account.addAccount
)

router.post("/auth", 
    body('email').isEmail(),
    body("password").not().isEmpty().escape(),
    account.authorization
)

router.post('/logout',
    account.logout
)

router.post("/auth_token", 
    account.decode_token
)

router.post("/forgot-password", 
    body('email').isEmail(),
    account.forgotPassword
)

router.post("/")

module.exports = router;

