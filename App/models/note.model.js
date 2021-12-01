const mongoose = require('mongoose');
const utilities = require('../utilities/helper.js');

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
    loginUser = (loginData, callBack) => {
        //To find a user email in the database
        user.findOne({ email: loginData.email }, (error, data) => {
            if (error) {
                return callBack(error, null);
            } else if (!data) {
                return callBack("Invalid Credential", null);
            } else {
                return callBack(null, data);
            }
        });
    }
}
module.exports = new userModel();
