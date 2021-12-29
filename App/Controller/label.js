const validation = require('../utilities/validation')

class Label {
    /**
     * @description function written to Added Label into the database
     * @param {*} a valid req body is expected
     * @param {*} res
     * @returns response
     */
    addLabelById = (req, res) => {
        try {
            if (req.user) {
                const labelName = req.body.labelName
                const validateResult = validation.labelValidation.validate(labelName);
                if (validateResult.error) {
                    const response = { sucess: false, message: "Wrong Input Vaidation" }
                    return res.status(422).json(response)
                }
                return res.status(201).json({
                    message: 'Valid Token'
                });
            } else {
                return res.status(400).json({
                    message: 'Entry of token is false'
                });
            }
        } catch (err) {
            logger.error('Internal Server Error');
            return res.status(500).json({
                message: 'Internal Server Error'
            }
            )
        }
    }
}
module.exports = new Label();