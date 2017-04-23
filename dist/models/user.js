'use strict';

module.exports = function (sequelize, DataTypes) {
    //Define the Author model
    var user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: 'uniqueUser',
                msg: 'There is already exists user under that email.'
            },
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        //set the timestamps to be underscored: (created_at, updated_at)
        underscored: true,
        classMethods: {
            associate: function associate(models) {
                // associations can be defined here
            }
        }
    });
    return user;
};