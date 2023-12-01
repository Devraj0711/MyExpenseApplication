const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const errorController = require('./Expense_controllers/error');

const sequelize =require('./util/database');

const app = express();

// get config vars
require('dotenv').config();

app.use(cors());

app.use(express.json()); // Parse JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

const adminRoutes = require('./Expense_routes/admin_home');

const detailRoutes= require('./Expense_routes/expense_route');

const purchaseRoutes= require('./Expense_routes/purchase_routes');

const premiumRoutes= require('./Expense_routes/premium_route');

const resetPasswordRoutes = require('./Expense_routes/resetPassword_routes')

const Home_page= require('./models/db_model'); // expenseReports
const Exp_page= require('./models/ExpenseDB'); //details
const Order=  require('./models/order');
const Forgotpassword = require('./models/resetPassword_db');
const StoreURL= require('./models/StoreURL');



Exp_page.belongsTo(Home_page);
Home_page.hasMany(Exp_page);  // user with multiple expenses// one to many

Home_page.hasMany(Order);
Order.belongsTo(Home_page);

Home_page.hasMany(Forgotpassword);
Forgotpassword.belongsTo(Home_page);

Home_page.hasMany(StoreURL);
StoreURL.belongsTo(Home_page);

app.use(adminRoutes);

app.use(detailRoutes);

app.use(purchaseRoutes);

app.use(premiumRoutes);

app.use(resetPasswordRoutes);

app.use(errorController.get404);  

app.use((req, res) => {
    console.log('url', req.url);
    res.sendFile(path.join(__dirname, `views/${req.url}`))

})



//use of sequelize to carry on all the DB commands
sequelize.sync() // Use { force: true } only during development to drop existing tables
    .then(result => {
        console.log('Tables synchronized successfully.');
        app.listen(process.env.PORT || 2000);
    })
    .catch(err => {
        console.log('Error synchronizing tables:', err);
    });

// Enable Sequelize logging
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

