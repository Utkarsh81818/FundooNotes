/**
 Purpose : to recieve request from routes and forward it to service laye
* @file : label.js
* @author : Utkarsh Mishra
* @version : 1.0
*/
const validation = require('../utilities/validation')
const service = require('../service/label')
const { logger } = require('../../logger/logger')

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
                const labelName = { labelName: req.body.labelName }
                const validateResult = validation.labelValidation.validate(labelName);
                if (validateResult.error) {
                    const response = { sucess: false, message: "Wrong Input Vaidation" }
                    return res.status(422).json(response)
                }
                const label = {
                    labelName: req.body.labelName,
                    userId: req.user.dataForToken.id,
                    noteId: req.params.id,
                    email: req.user.dataForToken.email
                }
                service.addLabelById(label, (error, data) => {
                    if (error) {
                        const response = { sucess: true, message: error.message }
                        return res.status(201).send(response)
                    }
                    else {
                        return res.status(201).json({
                            message: 'Valid Token'
                        })
                    }
                })
            }
        } catch (err) {
            logger.error('Internal Server Error');
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }
}
module.exports = new Label();