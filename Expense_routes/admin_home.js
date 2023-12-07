const path = require('path');

const express = require('express');

const adminController = require('../expense_controllers/admin_controllers');

const router = express.Router();

// /admin/home => GET

router.get('/', adminController.getSignup);
router.post('/Home/signup', adminController.postAddDetails);

router.get('/Home/signin',adminController.getSignin);
router.post('/Home/signin',adminController.PostSignin);

router.get('/password/forgetPassword', adminController.getPassword)

module.exports = router;
