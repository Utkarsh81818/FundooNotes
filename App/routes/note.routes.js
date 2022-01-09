/**
 * @module       routes
 * @file         user.routes.js
 * @description  API Routing
 * @author       Utkarsh Mishra
 */

const userController = require('../Controller/user.controller.js');
const noteController = require('../Controller/notes.controller')
const helperValidation = require('../utilities/helper');
const label = require('../Controller/label.controller')

module.exports = (app) => {
  // api for registration
  app.post('/register', userController.register);
  // api for login
  app.post('/login', userController.login);
  // api for forgot pasword
  app.post('/forgotPassword', userController.forgotPassword);
  //api for reset-password
  app.put('/reset-Password', userController.resetPassword);
  // api for Create Note 
  app.post('/note', helperValidation.tokenValidation, noteController.createNote);
  // api for getnote
  app.get('/note', helperValidation.tokenValidation, noteController.getNote);
  // api for getnotes Id 
  app.get('/note/:id', helperValidation.tokenValidation, noteController.getNoteById);
  // api for updatenotes Id 
  app.put('/note/:id', helperValidation.tokenValidation, noteController.updateNoteById);
  // api for delete By Id 
  app.delete('/note/:id', helperValidation.tokenValidation, noteController.deleteNoteById);
  // api for addLabel By Id 
  app.post('/label/:id', helperValidation.tokenValidation, label.addLabelById);
  // api for getLabel 
  app.get('/label', helperValidation.tokenValidation, label.getLabel);
  // api for getLabel by id
  app.get('/label/:id', helperValidation.tokenValidation, label.getLabel);
  // api for UpdateLabel By Id
  app.put('/label/:id', helperValidation.tokenValidation, label.updatelabelById);
  // api for DeleteLabel By Id
  app.delete('/label/:id', helperValidation.tokenValidation, label.deletelabelById);
  // Rabbit MQ for verifying User
  app.get("/confirmregister/:token", userController.confirmRegister);
}