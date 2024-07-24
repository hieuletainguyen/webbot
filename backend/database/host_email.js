const nodemailer = require("nodemailer");
const {myEmail, myEmailPassword} = require("../secret-data")

const transport = nodemailer.createTransport({
    host: myEmail,
    secure: true, 
    auth: {
        user: myEmail,
        pass: myEmailPassword
    }
})

exports.module = transport