/* eslint-disable no-empty */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/**
 * @description   : Taking the request from the client and gives the response
 * @author        : Utkarsh Mishra
*/
const userService = require('../service/user.service.js');
const validation = require('../utilities/validation');
const { logger } = require('../../logger/logger');

class Controller {
  /**
  * @description Create and save user and sending response to service
  * @method register to save the user
  * @param req,res for service
  */
  register = (req, res) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      };

      const registerValidation = validation.registerValidation.validate(user);
      if (registerValidation.error) {
        logger.error('Wrong Input Validations');
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: registerValidation,
        });
      }

      userService.registerUser(user, (error, data) => {
        if (error) {
          return res.status(400).json({
            success: false,
            message: 'User already exist',
          });
        }
        logger.info('User registered');
        return res.status(200).json({
          success: true,
          message: 'User Registered',
          data: {
            verified: data.verified,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          },
        });
      });
    } catch (error) {
      logger.error('Internal server error');
      return res.status(500).json({
        success: false,
        message: 'Error While Registering',
        data: null,
      });
    }
  };

  /**
     * @description retrieving login info from user by email and password
     * @method login
     * @param req,res for service
     */
  login = (req, res) => {
    try {
      const userLoginInfo = {
        email: req.body.email,
        password: req.body.password,
      };

      const loginValidation = validation.authLogin.validate(userLoginInfo);
      if (loginValidation.error) {
        logger.error('Wrong Input Validations');
        res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
        });
      }

      userService.userLogin(userLoginInfo, (error, data) => {
        if (error) {
          return res.status(400).json({
            success: false,
            message: 'Invalid Information! Please enter valid information',
            error,
          });
        }
        logger.info('User logged in successfully');
        return res.status(200).json({
          success: true,
          message: 'User logged in successfully',
          data,
        });
      });
    } catch(error) {
      return res.status(500).json({
        success: false,
        message: 'Error while Login',
        error,
        data: null,
      });
    }
  };

  /**
    * description controller function for forgot password
    * @param {*} req
    * @param {*} res
    * @returns
    */
  forgotPassword = (req, res) => {
    try {
      const userCredential = {
        email: req.body.email,
      };

      const validationforgotPassword = validation.authenticateLogin.validate(userCredential);
      if (validationforgotPassword.error) {
        logger.error('Wrong Input Validations');
        return res.status(400).send({
          success: false,
          message: 'Wrong Input Validations',
          data: validationforgotPassword,
        });
      }

      userService.forgotPassword(userCredential, (error, result) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: 'failed to send email',
          });
        }
        return res.status(200).send({
          success: true,
          message: 'Email sent successfully',
        });
      });
    } catch (error) {
      logger.error('Internal server error');
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
        result: null,
      });
    }
  };

  /**
   * description controller function for reset password
   * @param {*} req
   * @param {*} res
   * @returns
   */
  resetPassword = async (req, res) => {
    try {
      const userResetPasswordInfo = {
        email: req.body.email,
        password: req.body.password,
        code: req.body.code,
      };
      const resetValidation = validation.validateReset.validate(userResetPasswordInfo);
      if (resetValidation.error) {
        logger.error(resetValidation.error);
        res.status(400).send({
          success: false,
          message: resetValidation.error.message,
        });
      }

      const isReset = await userService.resetpassword(userResetPasswordInfo);
      if (!isReset) {
        return res.status(401).json({
          success: false,
          message: 'Unable to reset password. Please enter correct info',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'password reset successfull',
        data: isReset,
      });
    } catch (error) {
      logger.error('Internal server error');
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
        result: null,
      });
    }
  };

  confirmRegister = (req, res) => {
    try {
      const data = {
        token: req.params.token,
      };
      userService.confirmRegister(data, (error, data) => {
        if (error) {
          return res.status(404).json({
            success: false,
            message: 'error',
          });
        }
        return res.status(200).json({
          success: true,
          message: 'Email Successfully Verified',
        });
      });
    } catch (error) {
      logger.error('Internal server error');
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
        result: null,
      });
    }
  };
}
module.exports = new Controller();
