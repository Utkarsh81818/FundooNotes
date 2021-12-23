/**
 * @module       utilities
 * @file         helper.js
 * @description  it contains the Hashing and Token
 * @author       Utkarsh Mishra
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class Helper {
  hashing = (password) => {
    return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10)
      .then((err)=> {
        resolve(err);
      }).catch((hash)=> {
         reject(hash);
      });
    });
  }

  token = (data) => {
    const dataForToken = {
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    };
    return jwt.sign({ dataForToken }, process.env.JWT_SECRET, { expiresIn: '24H' });
  };
}

module.exports = new Helper();