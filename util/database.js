const Sequelize = require('sequelize');

const dotenv = require ('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  logging: console.log, // Enable logging of executed SQL queries

});

module.exports = sequelize;
