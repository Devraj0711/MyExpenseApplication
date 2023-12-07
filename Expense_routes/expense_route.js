const path = require('path');

const jwt=require('jsonwebtoken');

const express = require('express');

const expenseController = require('../expense_controllers/exp_controllers');

const userauthentication= require('../middleware/auth');

const router = express.Router();

// /admin/home => GET

router.get('/Expense/details', expenseController.getIndex);

router.post('/Expense/details', expenseController.postIndex);


router.delete('/deleteexpense/:expenseid', userauthentication.authentication, expenseController.deleteexpense)

router.get('/download', userauthentication.authentication, expenseController.downloadexpense)

module.exports = router;
