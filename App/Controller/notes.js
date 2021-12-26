const noteService = require('../service/notes');
const { logger } = require('../../logger/logger');
const validation = require('../utilities/validation');


class Note {
  /**
    * @description function written to create notes into the database
    * @param {*} a valid req body is expected
    * @param {*} res
    * @returns response
    */

  createNote = (req, res) => {
    try {
      const note = {
        userId: req.user.dataForToken.id,
        title: req.body.title,
        description: req.body.description
      };
      const createNoteValidation = validation.notesCreationValidation.validate(note);
      if (createNoteValidation.error) {
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: createNoteValidation
        });
      }
      noteService.createNote(note, (error, data) => {
        if (error) {
          logger.error('Error while creating note');
          return res.status(400).json({
            message: 'Error while creating note',
            success: false
          });
        } else {
          logger.info('Note inserted Successfully');
          return res.status(201).send({
            message: 'Note inserted Successfully',
            success: true,
            data: data
          });
        }
      });
    } catch (error) {
      logger.error('Internal server error');
      return res.status(500).json({
        message: 'Internal server error',
        success: false
      });
    }
  }

  /**
   * @description function written to get all the notes from the database
   * @param {*} req
   * @param {*} res
   * @returns response
   */
  getNote = (req, res) => {
    try {
      const id = { id: req.user.dataForToken.id };
      const getNoteValidation = validation.noteValidation.validate(id);
      if (getNoteValidation.error) {
        console.log(getNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: getNoteValidation
        });
      }
      noteService.getNote(id, (error, data) => {
        if (error) {
          logger.error('Failed to get all notes');
          return res.status(400).json({
            message: 'failed to get all notes',
            success: false
          })
        }
        else {
          logger.info('Get All Notes successfully');
          return res.status(201).json({
            message: 'Get All Notes successfully',
            success: true,
            data: data
          })
        }
      })
    } catch (error) {
      logger.error('Internal server error');
      return res.status(500).json({
        message: 'Internal server error',
        success: false
      });
    }
  }

  /**
   * @description function written to getNotesById from the database
   * @param {*} req
   * @param {*} res
   * @returns response
   */
  getNoteById = (req, res) => {
    try {
      const id = { userId: req.user.dataForToken.id, noteId: req.params.id };
      const getNoteValidation = validation.getNoteValidation.validate(id);
      if (getNoteValidation.error) {
        console.log(getNoteValidation.error);
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: getNoteValidation
        });
      }
      noteService.getNoteById(id, (err, data) => {
        if (err) {
          logger.error('Note is Found')
          return res.status(404).json({
            message: 'Note not found',
            success: false
          });
        }
        logger.info('Note retrieved succesfully');
        return res.status(200).json({
          message: 'Note retrieved succesfully',
          success: true,
          data: data
        });
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Internal Error',
        success: false,
        data: err
      });
    }
  };

  /**
  * @description function written to updateNotesById from the database
  * @param {*} req
  * @param {*} res
  * @returns res
  * */
  updateNoteById = (req, res) => {
    try {
      const updateNote = {
        id: req.params.id,
      };
      const updateNoteValidation = validation.notesUpdateValidation.validate(updateNote);
      if (updateNoteValidation.error) {
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: updateNoteValidation
        });
      }
      return res.status(201).json({
        message: 'Getting Appropriate response from token',
        success: true
      });
    }
    catch (error) {
      logger.error('Internal server error');
      return res.status(500).json({
        message: 'Internal server error',
        success: false
      });
    }
  }
}
module.exports = new Note();