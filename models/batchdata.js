const sequelize = require('../database/initializeDatabase');
const {DataTypes, Model, Sequelize} = require('sequelize');

class BatchLeader extends Model{}
BatchLeader.init({
    _uid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    }, 
    teamname: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'BatchLeader'
});

class BatchData extends Model{}

BatchData.init({
    _uid: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    active: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min:0,
            max: 10
        }
    },
    isPartiallyActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min:0,
            max: 10
        }
    },
    inactive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min:0,
            max: 10
        }
    },
    teamcoordination: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min:1,
            max: 6
        }
    },
    teamLeaderAvaliblity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min:1,
            max: 6
        }
    },
    viceTeamLeaderAvailiblity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min:1,
            max: 6
        }
    },
    doubtSessionTaken: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teamRating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min:1,
            max: 6
        }
    },
    videoScrum: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: true
    },
    thaOfTL: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    thaOfVTL: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
    }
},{
    sequelize,
    modelName:'BatchData'
});

module.exports = {BatchData, BatchLeader}