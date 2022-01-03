/**
 * @module       routes
 * @file         user.routes.js
 * @description  API Routing
 * @author       Utkarsh Mishra
 */

const userController = require('../Controller/user.controller.js');
const noteController = require('../Controller/notes.controller')
const helperValidation = require('../utilities/helper');
const label = require('../Controller/label')

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
  app.post('/createnotes', helperValidation.validateToken, noteController.createNote);
  // api for getnote
  app.get('/getnotes', helperValidation.validateToken, noteController.getNote);
  // api for getnotes Id 
  app.get('/getnotes/:id', helperValidation.validateToken, noteController.getNoteById);
  // api for updatenotes Id 
  app.put('/updatenotes/:id', helperValidation.validateToken, noteController.updateNoteById);
  // api for delete By Id 
  app.delete('/deletenotes/:id', helperValidation.validateToken, noteController.deleteNoteById);
  // api for addLabel By Id 
  app.post('/addlabel/:id', helperValidation.validateToken, label.addLabelById);
  // api for getLabel 
  app.get('/getlabel', helperValidation.validateToken, label.getLabel);
  // api for getLabel by id
  app.get('/getlabel/:id', helperValidation.validateToken, label.getLabel);
  // api for UpdateLabel By Id
  app.put('/updatelabel/:id', helperValidation.validateToken, label.updatelabelById);
}