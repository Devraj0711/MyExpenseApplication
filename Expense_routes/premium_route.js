const path = require('path');

const jwt=require('jsonwebtoken');

const express = require('express');

const premiumFeatureController= require('../Expense_controllers/premiumFeatures_controller');

const userauthentication= require('../middleware/auth');

const router = express.Router();

router.get('/premium/showleaderboard', userauthentication.authentication, premiumFeatureController.showLeaderboard);

module.exports = router;
