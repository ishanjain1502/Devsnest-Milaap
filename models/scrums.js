const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/initializeDatabase');
//uid, present/absent , DATE ,
const Scrum = sequelize.define('Scrum', {
    _uid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    isPresent: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    backlog: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    lastLecture: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    progress: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    topicsToCover: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
}, {
    tableName: 'Scrum'
});

module.exports = Scrum;