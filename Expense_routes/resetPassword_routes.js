const path = require('path');

const express = require('express');

const adminController = require('../expense_controllers/resetPassword_controller');

const router = express.Router();

// /admin/home => GET

router.get('/updatepassword/:resetpasswordid', adminController.updatepassword)

router.get('/resetpassword/:id', adminController.resetpassword)

router.use('/password/forgetPassword', adminController.forgotpassword)

module.exports = router;