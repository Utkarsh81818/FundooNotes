class labelModel {

    /**
     * @description Create a new label
     */
     addLabelById = (label, callback) => {
        if (label) {
            return callback(null, label)
        }
        return callback("label is not found", null)
    }
}
module.exports = new labelModel();