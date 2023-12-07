const Home_page = require('../models/db_model');
const Expense = require('../models/ExpenseDB');
const path = require('path');
const { Op } = require('sequelize');

const bcrypt= require('bcrypt');

const jwt= require('jsonwebtoken');

const userController=  require('./admin_controllers');

const Order =require('../models/order');
const sequelize = require('../util/database');


exports.showLeaderboard = async (req, res) => {
    try {
        // optimized code 
        const leaderboardofUsers= await Home_page.findAll({
            // attributes: ['id', 'Username', [sequelize.fn('sum', sequelize.col('Amount')), 'total_cost']],
            // include: [
            //     {
            //         model: Expense,
            //         attributes: []
            //     }
            // ],
            // group: ['id'],
            order:[['totalExpenses', 'DESC']]
        })
        res.status(200).json(leaderboardofUsers)
        

    } 
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};





