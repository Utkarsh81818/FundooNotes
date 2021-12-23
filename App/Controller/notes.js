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
    const token = req.user
    if (token) {
      return res.status(201).send({
        message: 'Found Token',
        success: true,
      });
    }
    else {
      return res.status(400).send({
        success: false,
        message: 'Wrong Input Validations',
      })
    }
  }
}
module.exports = new Note();