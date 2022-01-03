/**
 Purpose : to recieve request from routes and forward it to service laye
* @file : label.js
* @author : Utkarsh Mishra
* @version : 1.0
*/
const validation = require('../utilities/validation')
const service = require('../service/label.service')
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
            const validateResult = validation.getLabelById.validate(labelDetails);
            if (validateResult.error) {
                const response = { sucess: false, message: "Wrong Input Vaidation" }
                return res.status(422).json(response)
            }
            service.getlabelById(labelDetails, (error, data) => {
                if (error) {
                    return res.status(400).json({
                        error: error.message,
                        message: 'Error in fetching ',
                        data: CredentialValidation.error
                    })
                }
                else if (!data) {
                    return res.status(401).json({
                        error: error.message,
                        data: data,
                        message: 'Invalid data, data not found'
                    })
                }
                return res.status(200).json({
                    message: 'Validation is successful'
                });
            });
        } catch {
            logger.error('Internal Server Error');
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }

    /**
     * @description function written to UpdateLabelById into the database
     * @param {*} a valid req body is expected
     * @param {*} res
     * @returns response
     */
    updatelabelById = (req, res) => {
        try {
            if (req.user) {
                const labeldata = {
                    userId: req.user.dataForToken.id,
                    id: req.params.id,
                    labelName: req.body.labelName
                }
                const validateResult = validation.updateLabel.validate(labeldata);
                if (validateResult.error) {
                    const response = { sucess: false, message: "Wrong Input Vaidation" }
                    return res.status(422).json(response)
                }
                service.updatelabelById(labeldata, (error, data) => {
                    if (error) {
                        return res.status(400).json({
                            error: error.message,
                            message: 'Error in updating '
                        })
                    }
                    else if (!data) {
                        return res.status(401).json({
                            error: error.message,
                            data: data,
                            message: 'Invalid Updation'
                        })
                    }
                    return res.status(201).json({
                        message: 'Label Updated Successfully',
                        data: data
                    });
                });
            }
        }
        catch (error) {
            logger.error('Internal Server Error');
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }

    /**
     * @description function written to deleteLabelById into the database
     * @param {*} a valid req body is expected
     * @param {*} res
     * @returns response
     */
    deletelabelById = (req, res) => {
        try {
            return res.status(201).json({
                message: 'Token is Valid'
            });
        } catch {
            return res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    }
}
module.exports = new Label();