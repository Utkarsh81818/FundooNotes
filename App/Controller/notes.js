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
        console.log(createNoteValidation.error);
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
}
module.exports = new Note();