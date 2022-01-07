/**
 * @module       Service
 * @file         user.service.js
 * @description  Service class holds the callback method for controller
 * @author       Utkarsh Mishra
 */

const userModel = require('../models/user.model.js')
const utilities = require('../utilities/helper.js');
const { logger } = require('../../logger/logger');
const bcrypt = require('bcryptjs');
const nodemailer = require('../utilities/nodeemailer.js');
const jsonWebToken = require("jsonwebtoken");
const rabbitMQ = require("../utilities/rabbitmq");
require('dotenv').config();

class userService {

  /**
     * @description Create and save user then send response to controller
     * @method registerUser to save the user
     * @param callback callback for controller
     */
   registerUser = (user, callback) => {
    userModel.registerUser(user, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        // Send Welcome Mail to User on his Mail
        utilities.sendWelcomeMail(user);
        const secretkey = process.env.JWT_SECRET;
        utilities.jwtTokenVerifyMail(data, secretkey, (err, token) => {
          if (token) {
            rabbitMQ.sender(data, data.email);
            nodemailer.verifyMail(token, data);
            return callback(null, token);
          } else {
            return callback(err, null);
          }
        });
        return callback(null, data);
      }
    });
  };
  /**
     * @description sends the data to loginApi in the controller
     * @method userLogin
     * @param callback callback for controller
     */
  userLogin = (InfoLogin, callback) => {
    userModel.loginUser(InfoLogin, (error, data) => {
      if (data) {
        bcrypt.compare(InfoLogin.password, data.password, (error, validate) => {
          if (!validate) {
            logger.error(error);
            return callback(error + 'Invalid Password', null);
          } else {
            logger.info(' token generated ');
            const token = utilities.token(data);
            return callback(null, token);
          }
        });
      } else {
        logger.error(error);
        return callback(error, null);
      }
    });
  }

  /**
    * @description sends the code to forgotPasswordAPI in the controller
    * @method forgotPassword
    * @param callback callback for controller
    */
  forgotPassword = (email, callback) => {
    userModel.forgotPassword(email, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, nodemailer.sendEmail(data));
      }
    });
  };


  /**
   * @description it acts as a middleware between controller and model for reset password
   * @param {*} inputData
   * @param {*} callback
   * @returns
   */
  resetPassword = (userData, callback) => {
    userModel.resetPassword(userData, (error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  }

  confirmRegister = (data, callback) => {
    logger.info(data.token);
    const decode = jsonWebToken.verify(data.token, process.env.JWT_SECRET);
    if (decode) {
      rabbitMQ
        .receiver(decode.email)
        .then((val) => {
          userModel.confirmRegister(JSON.parse(val), (error, data) => {
            if (data) {
              return callback(null, data);
            } else {
              return callback(error, null);
            }
          });
        })
        .catch((error) => {
          logger.error(error);
        });
    }
  };
}

module.exports = new userService();