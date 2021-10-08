const sequelize = require('../database/initializeDatabase');
const {Model, DataTypes} = require('sequelize');
const roles = require('../utils/roles');

Scrum.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      last_lecture: {
        type:DataTypes.BOOLEAN,
        allowNull: false
    },
    tha_link: {
        type:DataTypes.STRING,
        allowNull: false
    },
    tha_progress: {
        type:DataTypes.STRING,
        allowNull: false
    },
    present: {
        type:DataTypes.STRING,
        allowNull: false
    },
    tha_progress: {
        type:DataTypes.STRING,
        allowNull: false
    },
    to_cover: {
        type:DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at:  DataTypes.DATE,

}, {
    sequelize,
    modelName: 'Scrum'
});

module.exports = Scrum;
