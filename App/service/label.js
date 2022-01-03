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
     * @method labelModel.get calls model class method
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
     * @method labelModel.getById calls model class method
     */
    getlabelById = (labelDetails, callback) => {
        model.getlabelById(labelDetails, (error, data) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, data);
        })
    }

    /**
     * @description Update labelByID
     * @method labelModel.update calls model class method
     */
    updatelabelById = (labeldata, callback) => {
        if (!labeldata) {
            return callback(error, null);
        }
        return callback(null, labeldata)
    }
}

module.exports = new labelService();