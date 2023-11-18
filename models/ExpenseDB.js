const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Exp_page = sequelize.define('details', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    Amount: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      // validate: {
      //   notEmpty: true, // Ensures that the username is not an empty string
      //   len: [1, 255] // Limits the username length between 1 and 255 characters
      // }
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
      // You can add validation for the email as well if needed
    },
    Category: {
      type: Sequelize.STRING,
      allowNull: false
      // You can add validation for the password as well if needed
    }
  });
  

  module.exports= Exp_page;
  