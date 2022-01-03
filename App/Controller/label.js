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
                        const response = { sucess: false, message: error.message, }
                        return res.status(201).send(response)
                    }
                    else {
                        return res.status(201).json({
                            message: 'Label Added Successfully',
                            data: data
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

    /**
     * @description function written to Get Label into the database
     * @param {*} a valid req body is expected
     * @param {*} res
     * @returns response
     */
    getLabel = (req, res) => {
        try {
            if (req.user) {
                const userId = { id: req.user.dataForToken.id }
                const labelName = { labelName: req.body.labelName }
                const validateResult = validation.getLabel.validate(labelName);
                if (validateResult.error) {
                    const response = { sucess: false, message: "Wrong Input Vaidation" }
                    return res.status(422).json(response)
                }
                service.getLabel(userId, (error, data) => {
                    if (error) {
                        return res.status(400).json({
                            message: 'Error in getting data'
                        });
                    } else {
                        return res.status(200).json({
                            message: 'Label is retrieved Successful',
                            data: data
                        });
                    };
                })
            }
        } catch {
            logger.error('Internal Server Error');
            return res.status(500).json(response)
        }
    }

    /**
     * @description function written to GetLabelById into the database
     * @param {*} a valid req body is expected
     * @param {*} res
     * @returns response
     */
    getLabelById = (req, res) => {
        try {
            const labelDetails = {
                userId: req.user.dataForToken.id,
                labelId: req.params.id
            };
            const labelName = req.body.labelName
            const validateResult = validation.getLabelById.validate(labelDetails);
            if (validateResult.error) {
                const response = { sucess: false, message: "Wrong Input Vaidation" }
                return res.status(422).json(response)
            }
            return res.status(200).json({
                message: 'Validation is successful'
            });
        } catch {
            logger.error('Internal Server Error');
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }
}
module.exports = new Label();