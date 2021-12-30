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

const label = mongoose.model('noteLabel', labelSchema);

class labelModel {
    /**
     * @description Create a new label
     */
    addLabelById = (label, callback) => {
        const findNotes = NoteRegister.find({ email: label.email, id: label.noteId })
        if (findNotes.length === 0) {
            return callback('This note is not exist or this belongs to another user', null);
        }
        return callback('This note belongs to same user', label.noteId)
    }
}
module.exports = new labelModel();