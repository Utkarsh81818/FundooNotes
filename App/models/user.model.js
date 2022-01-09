/* eslint-disable import/extensions */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
/* eslint-disable new-cap */
/**
 * @module      :  Models
 * @file        :  User.model.js
 * @description :  Taking the request from the client and gives the response
 * @author      :  Utkarsh Mishra
 */
const mongoose = require('mongoose');
const utilities = require('../utilities/helper.js');
const { logger } = require('../../logger/logger');
const Otp = require('./otp.js');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    googleLogin: { type: Boolean },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
  },
);

const user = mongoose.model('User', userSchema);

class userModel {
  /**
      * @description register User in the database
      * @param User
      * @param callback
      */
  registerUser = (userDetails, callback) => {
    const newUser = new user({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      password: userDetails.password,
    });
    try {
      utilities.hashing(userDetails.password, (error, hash) => {
        if (hash) {
          newUser.password = hash;
          newUser.save((error, data) => {
            if (error) {
              callback(error, null);
            } else {
              callback(null, data);
            }
          });
        } else {
          throw error;
        }
      });
    } catch (error) {
      logger.error('Find error in model');
      return callback('Internal Error', null);
    }
  };

  /**
      * @description login User from the database
      * @param loginInfo
      * @param callback for service
      */

  loginModel = (loginData, callBack) => {
    // To find a user email in the database
    user.findOne({ email: loginData.email }, (error, data) => {
      if (error) {
        logger.error('Find error while loggin user');
        return callBack(error, null);
      } if (data.verified == false) {
        logger.error('Invalid User');
        return callBack('Invalid Credential / invalid user', null);
      }
      if (data.verified == true) {
        logger.info('data found in database');
        return callBack(null, data);
      }
      return callBack(error, null);
    });
  };

  /**
    * @description mongoose function for forgot password
    * @param {*} email
    * @param {*} callback
    */
  forgotPassword = (data, callback) => {
    user.findOne({ email: data.email }, (err, data) => {
      if (err) {
        logger.error('Some error in the query');
        return callback(err, null);
      }
      if (!data) {
        logger.error('User Not Exist');
      } else {
        return callback(null, data);
      }
    });
  };

  /**
        * @description mongooose method for reseting the password
        * @param {*} userData
        * @param {*} callback
        * @returns
        */
  resetpassword = async (Data) => {
    const codepresent = await Otp.findOne({ email: Data.email, code: Data.code });
    if (codepresent) {
      const hash = utilities.hashedPassword(Data.password);
      const success = await user.findOneAndUpdate({ email: Data.email }, { $set: { password: hash } });
      if (success) {
        return success;
      }
      return false;
    }
    return false;
  };

  confirmRegister = (data, callback) => {
    logger.info(data.firstName);
    user.findOneAndUpdate(
      { email: data.email },
      {
        verified: true,
      },
      (error, data) => {
        if (error) {
          logger.error('data not found in database');
          return callback(error, null);
        }
        logger.info('data found in database');
        return callback(null, data);
      },
    );
  };
}

module.exports = new userModel();
