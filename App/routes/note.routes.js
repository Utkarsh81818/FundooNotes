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
  app.post('/createnotes', helperValidation.tokenValidation, noteController.createNote);
  // api for getnote
  app.get('/getnotes', helperValidation.tokenValidation, noteController.getNote);
  // api for getnotes Id 
  app.get('/getnotes/:id', helperValidation.tokenValidation, noteController.getNoteById);
  // api for updatenotes Id 
  app.put('/updatenotes/:id', helperValidation.tokenValidation, noteController.updateNoteById);
  // api for delete By Id 
  app.delete('/deletenotes/:id', helperValidation.tokenValidation, noteController.deleteNoteById);
  // api for addLabel By Id 
  app.post('/addlabel/:id', helperValidation.tokenValidation, label.addLabelById);
  // api for getLabel 
  app.get('/getlabel', helperValidation.tokenValidation, label.getLabel);
  // api for getLabel by id
  app.get('/getlabel/:id', helperValidation.tokenValidation, label.getLabel);
  // api for UpdateLabel By Id
  app.put('/updatelabel/:id', helperValidation.tokenValidation, label.updatelabelById);
  // api for DeleteLabel By Id
  app.delete('/deletelabel/:id', helperValidation.tokenValidation, label.deletelabelById);
  // Rabbit MQ for verifying User
  app.get("/confirmregister/:token", userController.confirmRegister);
}