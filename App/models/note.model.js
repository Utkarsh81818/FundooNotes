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
 
 const userSchema = mongoose.Schema({
     firstName: {
         type: String,
         required: true
     },
     lastName: {
         type: String,
         required: true
     },
     email: {
         type: String,
         required: true,
         unique: true,
     },
     password: {
         type: String,
         required: true,
     }
 },
     {
         timestamps: true
     })
 
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
             password: userDetails.password
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
         }
         catch (error) {
             logger.error('Find error in model');
             return callback('Internal Error', null)
         }
     }
 
     /**
       * @description login User from the database
       * @param loginInfo
       * @param callback for service
       */
 
     loginUser = (loginData, callBack) => {
         //To find a user email in the database
         user.findOne({ email: loginData.email }, (error, data) => {
             if (error) {
                 logger.error('Find error while login user');
                 return callBack(error, null);
             } else if (!data) {
                 logger.error('Invalid User');
                 return callBack("Invalid Credential", null);
             } else {
                 logger.info('Email id found');
                 return callBack(null, data);
             }
         });
     }
 
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
             } else {
                 if (!data) {
                     log.error('User Not Exist')
                 } else {
                     return callback(null, data);
                 }
             }
         });
     };
 
     /**
         * @description mongooose method for reseting the password
         * @param {*} userData
         * @param {*} callback
         * @returns
         */
     resetPassword = (userData) => {
         return new Promise((resolve, reject) => {
             Otp.findOne({ code: userData.code })
                 .then((data) => {
                     if (userData.code == data.code) {
                         utilities.hashing(userData.password)
                             .then((hash) => {
                                 userData.password = hash;
                                 user.updateOne({ email: userData.email }, { '$set': { "password": userData.password } })
                                     .then((data) => {
                                         resolve(data)
                                     }).catch((error) => {
                                         reject(error)
                                     })
                             }).catch((error) => {
                                 rejct(error)
                             })
                     } else {
                         reject(null)
                     }
                 }).catch((error) => {
                     reject("Otp doesnt match", null)
                 });
         });
     }
 }
 
 module.exports = new userModel();