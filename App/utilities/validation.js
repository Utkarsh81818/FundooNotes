/**
 * @module       : utilities
 * @file         : validation.js
 * @description  : it contains the validation for register and login API
 * @author       : Utkarsh Mishra
 */

const Joi = require('joi');
class Validation {
  authRegister =
    Joi.object({
      firstName: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(new RegExp("^([A-Z]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{0,30}[ ]?[a-zA-Z]{0,30}?)")),

      lastName: Joi.string()
        .min(2)
        .max(30)
        .required()
        .pattern(new RegExp("^([A-Z]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{0,30}[ ]?[a-zA-Z]{0,30}?)")),


      email: Joi.string()
        .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
        .required(),

      password: Joi.string()
        .pattern(new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'))
        .required()
    });

  authLogin =
    Joi.object({
      email: Joi.string()
        .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
        .required(),

      password: Joi.string()
        .required()
        .pattern(new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'))
    });

  authenticateLogin = Joi.object({
    email: Joi.string()
      .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
      .required()
  })

  /**
  * description controller function for reset password
  * @param {*} req
  * @param {*} res
  * @returns
  */
  resetPassword = (req, res) => {
    try {
      const userData = {
        email: req.body.email,
        newPassword: req.body.newPassword,
        code: req.body.code
      };

      const resetVlaidation = validation.validateReset.validate(userData);
      if (resetVlaidation.error) {
        logger.error('Invalid password');
        res.status(422).send({
          success: false,
          message: 'Invalid password'
        });
        return;
      }

      userService.resetPassword(userData, (error, userData) => {
        if (error) {
          logger.error(error);
          return res.status(400).send({
            message: error,
            success: false
          });
        } else {
          logger.info('Password reset succesfully');
          return res.status(200).json({
            success: true,
            message: 'Password reset succesfully',
            data: userData
          });
        }
      });
    } catch (error) {
      logger.error('Internal server error');
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
        data: null
      });
    }
  }

  validateReset = Joi.object({
    email: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$'))
      .required(),
    newPassword: Joi.string()
      .pattern(new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'))
      .required(),
    code: Joi.string()
      .pattern(new RegExp('[0-9aA-Za-z]{1,}'))
      .required()
  });
}

module.exports = new Validation();