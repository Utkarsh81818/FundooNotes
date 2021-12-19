const { logger } = require('../../logger/logger');
const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: true,
    minlength: 2
  },
  description: {
    type: String,
    required: true,
    minlength: 2
  }
}, {
  timestamps: true
});

const NoteRegister = mongoose.model('NoteRegister', noteSchema);
class Model {
  /**
   * @description function written to create notes into database
   * @param {*} a valid info is expected
   * @returns saved data or if error returns error
   */
  createNote = (info, callback) => {
    const note = new NoteRegister({
      userId: info.userId,
      title: info.title,
      description: info.description
    });
    note.save((error, data) => {
      if (error) {
        logger.error(error);
        return callback(error, null);
      } else {
        return callback(null, data);
      }
    });
  }

  /**
  * @description function written to get all notes from database
  * @returns retrieved notes or if error returns error
  */
  getNote = (id) => {
    return new Promise((resolve, reject) => {
      NoteRegister.find({ userId: id.id })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  /**
  * @description function written to get notes by Id into database
  * @param {*} valid notesId is expected
  * @returns notes of particular Id or if any error return error
  */
  getNoteById = async (id) => {
    try {
      return await NoteRegister.find({ $and: [{ _id: id.noteId }, { userId: id.userId }] });
    } catch (err) {
      return err;
    }
  };
}

module.exports = new Model();