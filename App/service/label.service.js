const model = require('../models/label.model')
const { logger } = require('../../logger/logger')
const redisConnection = require('../connection/redis.connection')

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
        redisConnection.fetchData('fetchRedisById')
        model.getlabelById(labelDetails, (error, data) => {
            if (error) {
                return callback(error, null);
            }
            redisConnection.setData('fetchRedisById', process.env.TIME, JSON.stringify(data))
            return callback(null, data);
        })
    }

    /**
     * @description Update labelByID
     * @method labelModel.update calls model class method
     */
    updatelabelById = (labeldata, callback) => {
        model.updatelabelById(labeldata, (error, data) => {
            if (error) {
                return callback(error, null)
            }
            else if (!data) {
                return callback("data is empty", null);
            }
            return callback(null, data)
        })
    }

    /**
     * @description Delete labelByID
     * @method labelModel.delete calls model class method
     */
    deletelabelById = (delLabel, callback) => {
        model.deletelabelById(delLabel, (error, data) => {
            if (error) {
                return callback(error, null)
            }
            else if (!data) {
                return callback("Invalid data", null)
            }
            return callback(null, data)
        })
    }
}

module.exports = new labelService();