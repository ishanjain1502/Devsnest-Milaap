const sequelize = require('../database/initializeDatabase');
const {Model, DataTypes} = require('sequelize');
const roles = require('../utils/roles');

class User extends Model{
    //TODO: to check it
    getFullName() {
        return this.firstname + ' ' + this.lastname;
    }
}

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
    firstname: {
        type:DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull:false
    },
    phonenumber: {
        type: DataTypes.BIGINT,
        //TODO: Needs to look into unique
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            //TODO: Verify regex is working or not article refered https://www.w3resource.com/javascript/form/email-validation.php
            is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    role: {
        type: DataTypes.INTEGER,
        defaultValue: roles.TeamMember
    },
    team: {
        type: DataTypes.STRING,
    },
    profileimage: {
        //TODO: Check how to store  image on db
        type: DataTypes.BLOB
    }
}, {
    sequelize,
    modelName: 'User'
});

module.exports = User;
