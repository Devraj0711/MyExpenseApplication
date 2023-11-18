const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//
const StoreURL = sequelize.define('StorageURls', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    URL: Sequelize.STRING,
   
})

module.exports = StoreURL;