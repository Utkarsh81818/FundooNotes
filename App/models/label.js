const NoteRegister = require('../models/notes.model').NoteRegister;
const mongoose = require('mongoose');

const labelSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    noteId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'note'
    }],
    labelName: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const noteLabel = mongoose.model('noteLabel', labelSchema);

class labelModel {
    /**
     * @description Create a new label
     */
    addLabelById = (label, callback) => {
        const checkNotes = NoteRegister.find({ email: label.email, id: label.noteId })
        if (checkNotes.length === 0) {
            return callback('This note is not exist or this belongs to another user', null);
        }
        const checklabel = noteLabel.find({ userId: label.id, labelName: label.labelName });
        if (checklabel.length !== 0) {
            return callback("the fetched userId is match with label", label.userId)
        }
    }
}
module.exports = new labelModel();