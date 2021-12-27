/**
 * @module       routes
 * @file         user.routes.js
 * @description  API Routing
 * @author       Utkarsh Mishra
 */

const controller = require('../Controller/note.controller.js');
const noteController = require('../Controller/notes')
const helper = require('../utilities/helper');
const label = require('../Controller/label')

module.exports = (app) => {
  // api for registration
  app.post('/register', controller.register);
  // api for login
  app.post('/login', controller.login);
  // api for forget pasword
  app.post('/forgotPassword', controller.forgotPassword);
  //api for reset-password
  app.put('/reset-Password', controller.resetPassword);
  // api for Create Note 
  app.post('/createnotes', helper.validateToken, noteController.createNote);
  // api for getnote
  app.get('/getnotes', helper.validateToken, noteController.getNote);
  // api for getnotes Id 
  app.get('/getnotes/:id', helper.validateToken, noteController.getNoteById);
  // api for updatenotes Id 
  app.put('/updatenotes/:id', helper.validateToken, noteController.updateNoteById); 
  // api for delete By Id 
  app.delete('/deletenotes/:id', helper.validateToken, noteController.deleteNoteById);
  // api for addLabel By Id 
  app.post('/addlabel/:id', helper.validateToken, label.addLabelById);
}