/**
 * @module       utilities
 * @file         helper.js
 * @description  it contains the Hashing and Token
 * @author       Utkarsh Mishra
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodeMailer = require("nodemailer");

// Used Bycrypt for the password 
class Helper {
  hashing = (password, callback) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, hash);
      }
    });
  }

  // Implementing JWT Token 
  token = (data) => {
    const dataForToken = {
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    };
    return jwt.sign({ dataForToken }, process.env.JWT_SECRET, { expiresIn: '24H' });
  };

  // For validating the token 
  tokenValidation = (req, res, next) => {
    const header = req.headers.authorization;
    const myArr = header.split(" ");
    const token = myArr[1];
    try {
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
          if (error) {
            return res.status(400).send({ success: false, message: 'Invalid Token' });
          } else {
            req.user = decoded;
            next();
          }
        });
      } else {
        return res.status(401).send({ success: false, message: 'Authorisation failed! Invalid user' });
      }
    } catch (error) {
      return res.status(500).send({ success: false, message: 'Something went wrong!' });
    }
  }

  sendWelcomeMail = (data) => {
    try {
      const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD // generated ethereal password
        }
      });

      // send mail with defined transport object
      transporter.sendMail({
        from: "\"Fundoo Notes\" <no-reply@fundoonotes.com>", // sender address
        to: data.email, // list of receivers
        subject: "Welcome - Fundoo notes account", // Subject line
        text: `Hello ${data.firstName}.`, // plain text body
        html: `<b>Hello ${data.firstName} <br> <h2> Welcome to Fundoo notes.</h2> <br>Your account Has been created successfully<br></b>` // html body
      });
    } catch { }
  };

  jwtTokenVerifyMail = (payload, secretkey, callback) => {
    jwt.sign(
      { email: payload.email },
      secretkey,
      { expiresIn: "500h" },
      (err, token) => {
        if (err) {
          return callback("token not generated", null);
        } else {
          return callback(null, token);
        }
      }
    );
  };
}

module.exports = new Helper();