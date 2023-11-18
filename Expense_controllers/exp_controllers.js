const Home_page = require('../models/db_model'); // Adjust the path based on your project structure
const Exp_page = require('../models/ExpenseDB'); // Adjust the path based on your project structure
const StoreURL= require('../models/StoreURL');

const token_ans= require('../Expense_controllers/admin_controllers'); // for export ans

const sequelize = require('../util/database');

const jwt=require('jsonwebtoken');

const path = require('path');
const { Op } = require('sequelize');
const fs = require('fs');
const bcrypt= require('bcrypt');

const AWS= require('aws-sdk');

// const token = jwt.sign({ ExpenseReportIdId: Exp_page.ExpenseReportId }, 'dvysis23', { expiresIn: '1h' }); // Sign the token
const ansValue = token_ans.getAns();

exports.getIndex=(req, res, next) => {
  
  console.log("token value ---",ansValue)
 
  Exp_page.findAll()
  
    .then(expense => {
      const expenseData = JSON.stringify(expense);
      
      console.log(expenseData);
      res.render('expense/details', {
        expense: expenseData,
        pageTitle: 'All Products',
        path: '/expense/details',
        ansValue:ansValue
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.postIndex = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { Amount, description, Category } = req.body;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized', success: false });
    }

    // Verify the token
    const decodedToken = jwt.verify(token.replace('Bearer ', ''), 'dvysis23');

    const ExpenseReportIdId = decodedToken.ExpenseReportId;

    console.log("decoded ----", ExpenseReportIdId);

    const expenses = await Exp_page.create({
      Amount: Amount,
      description: description,
      Category: Category,
      ExpenseReportId: ExpenseReportIdId
    });

    // Adding total expense of a user in the totalExpenses column
    const user = await Home_page.findOne({ where: { id: expenses.ExpenseReportId } });

    const totalExpense = Number(user.totalExpenses) + Number(expenses.Amount);

    await Home_page.update(
      { totalExpenses: totalExpense },
      {
        where: { id: expenses.ExpenseReportId },
        transaction: t
      }
    );

    await t.commit();

    console.log(expenses);
    console.log("Let's see the total Expenses: ", totalExpense);
    return res.status(201).json({ expense: expenses, success: true });
  } catch (err) {
    console.error('Error inserting data: ', err);

    try {
      await t.rollback();
    } catch (rollbackErr) {
      console.error('Error rolling back transaction: ', rollbackErr);
    }

    return res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

function uploadToS3(data, filename){
  const BUCKET_NAME = 'expensetracker201077';
  const IAM_USER_KEY = 'AKIAVWJNUYL7YMME3TY4';
  const IAM_USER_SECRET = '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';

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  })
  
    var params = {
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: data,
      ACL: 'public-read'
    }

    return new Promise((resolve, reject) => {
      s3bucket.upload(params, (err, s3response) => {
        if(err) {
          console.log("Something went wrong", err)
          reject(err);
        }
        else {
          console.log('Success', s3response);
          resolve(s3response.Location);
        }
      })
   
    })
    
} //end of s3Upload function


exports.downloadexpense = async(req, res) => {
  try{
    const userId= req.user.id;
    
    const expenses= await Exp_page.findOne({ where: { ExpenseReportId: userId} });;
    console.log("Showing current user expenses ",expenses);
    const stringifiedExpenses = JSON.stringify(expenses);

    const filename= `Expense${userId}/${new Date()}.txt`;
    const fileURL= await uploadToS3(stringifiedExpenses, filename);
    const URL = await StoreURL.create({
      URL: fileURL,
      ExpenseReportId: userId 
    });

    res.status(200).json({fileURL, success: true,})
} catch(err){
  console.log(err);
  res.status(500).json({fileURL: '',success: false, err:err})
}

}