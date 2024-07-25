const nodemailer = require("nodemailer");
const {user, myEmail, myEmailPassword} = require("../secret-data")

const sendEmail = async ({to, subject, text, from = process.env.EMAIL_FROM || myEmail}) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email", 
        port: 587,
        auth: {
            user: process.env.USER || user,
            pass: myEmailPassword
        }
    })

    await transporter.sendMail({from, to, subject, text});

    console.log("email sent successfully")

}

module.exports = {
    sendEmail
}