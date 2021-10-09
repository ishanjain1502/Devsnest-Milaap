const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/initializeDatabase');
//uid, present/absent , DATE ,
const Scrum = sequelize.define('Scrum', {
    _scrumId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    _uid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    _teamId:{
        type: DataTypes.UUID,
        allowNull: false,
    },  
    isPresent: {
        type: DataTypes.BOOLEAN,
        // allowNull: false
    },
    Date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    backlog: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastLecture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    progress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    topicsToCover: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Scrum'
});
Scrum.beforeCreate(async (scrum, options) => {
    const date = new Date();
    scrum.Date=date.toDateString();
});


module.exports = Scrum;