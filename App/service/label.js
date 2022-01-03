const model = require('../models/label')

class labelService {
    /**
     * @description Create a new label 
     * @method labelModel.create calls model class method
     */
    addLabelById = (label, callback) => {
        model.addLabelById(label, (error, labeldata) => {
            if (!labeldata) {
                return callback("Undefined Label", null)
            }
            return callback(null, labeldata);
        })
    }

    /**
     * @description Get all labels
     * @method labelModel.create calls model class method
     */
    getLabel = (label, callback) => {
        model.getLabel(label, (error, data) => {
            if (error) {
                return callback("Undefined Label", null)
            }
            return callback(null, data);
        })
    }

    /**
     * @description Get labelByID
     * @method labelModel.create calls model class method
     */
    getlabelById = (labelCredential, callback) => {
        if (!labelDetails) {
            return callback(error, null);
        }
        return callback(null, labelDetails);
    }
}

module.exports = new labelService();