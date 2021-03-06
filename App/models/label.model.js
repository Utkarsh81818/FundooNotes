/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable class-methods-use-this */
const mongoose = require('mongoose');
const { NoteRegister } = require('./notes.model');

const labelSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  noteId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NoteRegister',
  }],
  labelName: {
    type: String,
    unique: true,
    required: true,
  },
}, {
  timestamps: true,
});

const noteLabel = mongoose.model('noteLabel', labelSchema);

class labelModel {
  /**
     * @description Create a new label
     * @param {*} data
     * @returns data else if returns error
     */
  addLabelById = async (label, callback) => {
    const checkNotes = NoteRegister.find({ email: label.email, _id: label.noteId });
    if (checkNotes.length === 0) {
      return callback('This note is not exist or this belongs to another user', null);
    }
    const findlabel = await noteLabel.find({ userId: label.userId, labelName: label.labelName });
    if (findlabel.length === 0 || !findlabel) {
      const labelModel = new noteLabel({
        userId: label.userId,
        noteId: label.noteId,
        labelName: label.labelName,
      });
      labelModel.save((error, data) => {
        if (error) {
          return callback(error, null);
        } if (data) {
          return callback(null, data);
        }
      });
    } else if (findlabel != 0 || !findlabel) {
      noteLabel
        .findOneAndUpdate(
          { labelName: label.labelName },
          { $addToSet: { noteId: [label.noteId] } },
          (error, data) => {
            if (data) {
              return callback(null, data);
            }
            return callback(error, null);
          },
        );
    }
  };

  /**
    * @description Get All label
    * @param {*} data
    * @returns data else if returns error
    */
  getLabel = (label, callback) => {
    noteLabel.find({ userId: label.id }, (error, data) => {
      if (error) {
        return callback('Label not found', null);
      }
      return callback(null, data);
    });
  };

  /**
    * @description Get Label By ID
    * @param {*} data
    * @returns data else if returns error
    */
  getlabelById = (labelDetails, callback) => {
    noteLabel.find({ $and: [{ _id: labelDetails.labelId }, { userId: labelDetails.userId }] });
    if (error) {
      return callback(error, null);
    } if (!data) {
      return callback('Data not found', null);
    }
    return callback(null, data);
  };

  /**
    * @description Update Label By ID
    * @param {*} data
    * @returns data else if returns error
    */
  updatelabelById = (labeldata, callback) => {
    noteLabel.findByIdAndUpdate(labeldata.id, { labelName: labeldata.labelName }, { new: true }, (error, data) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, data);
    });
  };

  /**
    * @description Delete Label By ID
    * @param {*} data
    * @returns data else if returns error
    */
  deletelabelById = (delLabel, callback) => {
    noteLabel.findOneAndDelete({ $and: [{ _id: delLabel.id }, { userId: delLabel.userId }] }, (error, data) => {
      if (error) {
        return callback(error, null);
      } if (!data) {
        return callback('data is not found', null);
      }
      return callback(null, data);
    });
  };
}
module.exports = new labelModel();
