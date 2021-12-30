const model = require('../models/label')

class labelService {
    /**
     * @description Create a new label 
     * @method labelModel.create calls model class method
     */
    addLabelById = (label, callback) => {
        model.addLabelById(label, (error, label) => {
            if (!label) {
                return callback("Undefined Label", null)
            }
            return callback(null, label);
        })
    }
}

module.exports = new labelService();