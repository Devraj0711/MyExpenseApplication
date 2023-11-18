const jwt= require('jsonwebtoken');  
const User=require('../models/db_model');
const details= require('../models/ExpenseDB');

const authentication = (req, res, next) => {
    try {
        const token= req.header('Authorization'); // Extract Username from the request body
        console.log("tokkkk value- -- - -  ", token);
        const user= jwt.verify(token, 'dvysis23' );
        console.log("user id ", user.ExpenseReportId);
        User.findByPk(user.ExpenseReportId).then(user => {
            console.log(JSON.stringify(user));
            req.user=user;
            next();
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(401).json({success: false})
    }
}

       

module.exports = { authentication };




