const path = require('path');

const jwt=require('jsonwebtoken');

const express = require('express');

const purchaseController = require('../Expense_controllers/purchase_controller');

const userauthentication= require('../middleware/auth');

const router = express.Router();

// /admin/home => GET

router.get('/premiummembership', userauthentication.authentication, purchaseController.purchasepremimum);

router.post('/updatetransactionstatus', userauthentication.authentication, purchaseController.updateTransactionStatus);

module.exports = router;
