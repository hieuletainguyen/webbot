const nodemailer = require("nodemailer");
const {user, myEmail, myEmailPassword} = require("../secret-data")

const sendEmail = async ({to, subject, text, from = process.env.EMAIL_FROM || myEmail}) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: myEmail,
            pass: myEmailPassword,
        }
    })

    await transporter.sendMail({from, to, subject, text});

    console.log("email sent successfully")

}

module.exports = {
    sendEmail
}