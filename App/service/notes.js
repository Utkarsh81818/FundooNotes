const { logger } = require('../../logger/logger');
const noteModel = require('../models/notes');

class Service {
    createNote = (note, callback) => {
        if (note) {
            callback(null, note)
        }
    }
}
module.exports = new Service();