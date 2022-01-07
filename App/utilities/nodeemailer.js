const nodemailer = require('nodemailer');
const { logger } = require('../../logger/logger.js');
require('dotenv').config();
const Otp = require('../models/otp.js');

exports.sendEmail = (mailMessage) => {
  let otpcode = Math.random().toString(36).substring(2, 12);
  let optData = new Otp({
    email: mailMessage.email,
    code: otpcode,
    expireIn: new Date().getTime() + 30 * 1000
  })
  optData.save();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  const message = {
    from: process.env.EMAIL,
    to: mailMessage.email,
    subject: 'Fundoo notes otp code',
    html: `Enter this otp to reset your password
    <h3>${otpcode}</h3>`
  };
  transporter.sendMail(message, (err, info) => {
    if (err) {
      logger.error(err)
    } else {
      logger.info(info.response);
      return info.response;
    }
  });
};

exports.verifyMail = (token, data) => {
  const link = `http://localhost:${process.env.PORT}/confirmregister/${token}`;
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD // generated ethereal password
    }
  });

  const info = {
    from: "\"Fundoo Notes\" <no-reply@fundoonotes.com>", // sender address
    to: data.email, // list of receivers
    subject: "Verify Mail for your Fundoo Note Account",
    html: `<b>Hello <h2> ${data.firstName} </h2><br><h1> Here is your link to Verify Mail:</h1><br> <button href="${link}"  style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"> <a href="${link}">click me for Verify </a></button></b>` // html body
  };

  // send mail with defined transport object
  const test = transporter.sendMail(info, (err, info) => {
    if (err) {
      logger.error(err)
    } else {
      console.log("email has been sent", info.response);
      return info.response;
    }
  });

  console.log("Message sent: %s", test.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(test));
};

