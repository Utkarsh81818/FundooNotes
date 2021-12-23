/**
 * @module       routes
 * @file         user.routes.js
 * @description  API Routing
 * @author       Utkarsh Mishra
 */

const controller = require('../Controller/note.controller.js');
const noteController = require('../Controller/notes')
const helper = require('../utilities/helper');

module.exports = (app) => {
  // api for registration
  app.post('/register', controller.register);
  // api for login
  app.post('/login', controller.login);
  // api for forget pasword
  app.post('/forgotPassword', controller.forgotPassword);
  //api for reset-password
  app.put('/reset-Password', controller.resetPassword);

  // api for CRUD
 
}