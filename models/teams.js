const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/initializeDatabase');

const Team = sequelize.define('Team', {
    teamMates: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    teamName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    teamId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Team'
});

module.exports = User;