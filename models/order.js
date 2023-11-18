const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Order= sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    payementid: Sequelize.STRING,
    orderid: Sequelize.STRING,
    status: Sequelize.STRING,
    // ExpenseReportId: Sequelize.INTEGER
})

module.exports= Order;