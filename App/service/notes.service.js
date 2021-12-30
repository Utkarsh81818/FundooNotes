const { logger } = require('../../logger/logger');
const noteModel = require('../models/notes.model').NoteModel;

class Service {
    /**
    * @description this function is written to trigger or call the models function
    * @returns error if it has error else data
    */
    createNote = (note, callback) => {
        noteModel.createNote(note, (error, data) => {
            if (error) {
                logger.error(error);
                return callback(error, null);
            } else {
                return callback(null, data);
            }
        });
    }

    /**
    * @description this function is written to trigger or call the models function
    * @returns error if it has error else data
    */
    getNote = (id, callback) => {
        noteModel.getNote(id, (error, data) => {
            if (data) {
                callback(null, data);
            }
            else {
                callback(error, null);
            }
        });
    };

    /**
    * @description it acts as a middleware between controller and model for getnotebyid 
    * @param {*} inputData
    * @param {*} callback
    * @returns
    */
    getNoteById = (id, callback) => {
        noteModel.getNoteById(id, (err, data) => {
            if (data) {
                return callback(null, data)
            } else {
                logger.error(error);
                return callback(err, null)
            }
        });
    };

    /**
    * @description it acts as a middleware between controller and model for getnotebyid 
    * @param {*} inputData
    * @param {*} callback
    * @returns
    */
    updateNoteById = (updateNote, callback) => {
        noteModel.updateNoteById(updateNote, (error, data) => {
            if (error) {
                logger.error(error);
                return callback(error, null);
            } else {
                return callback(null, data);
            }
        }
        );
    };

    /**
    * @description it acts as a middleware between controller and model for getnotebyid 
    * @param {*} inputData
    * @param {*} callback
    * @returns
    */
    deleteNoteById = (id, callback) => {
        noteModel.deleteNoteById(id, (error, data) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, data);
        });
    };
}
module.exports = new Service();