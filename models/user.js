const sequelize = require('../database/initializeDatabase');
const {Model, DataTypes} = require('sequelize');
const roles = require('../utils/roles');
const bcrypt = require('bcrypt');

class User extends Model{
    //TODO: to check it
    getFullName() {
        return this.firstname + ' ' + this.lastname;
    }
}

User.init({
    firstname: {
        type:DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull:false
    },
    phonenumber: {
        type: DataTypes.BIGINT(20),
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

//TODO: added hook to update password before creation password getting encrypted
User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(9);
    user.password = await bcrypt.hash(user.password, salt); 
});

module.exports = User;
