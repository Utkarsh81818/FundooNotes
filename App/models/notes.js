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
    NoteRegister.find({ userId: id.id }, (error, data) => {
      if (data) {
        callback(null, data);
      }
      else {
        callback(error, null);
      }
    });
  }

  /**
  * @description this function is written to trigger or call the models function
  * @returns error if it has error else data
  */
  getNoteById = (id, callback) => {
    NoteRegister.find({ $and: [{ _id: id.noteId }, { userId: id.userId }] })
      .then((data) => {
        callback(null, data)
      }).catch((err) => {
        callback(err, null)
      })
  };

  /**
  * @description this function is written to trigger or call the models function
  * @returns error if it has error else data
  */
  updateNoteById = (updatedNote, callback) => {
    try {
      NoteRegister.findByIdAndUpdate(updatedNote.id, { title: updatedNote.title, description: updatedNote.description }, { new: true }, (err, data) => {
        if (err) {
          return callback(err, null);
        } else {
          return callback(null, data);
        }
      });
    } catch (err) {
      return callback(err, null);
    }
  };

  /**
 * @description this function is written to trigger or call the models function
 * @returns error if it has error else data
 */
  deleteNoteById = (id, callback) => {
    if (!id) {
      return callback("Id is not found", null);
    }
    return callback(null, id);
  };
}
module.exports = new Model();