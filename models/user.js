'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate() {
            // Only define association if model exists
            {
            }
        }
    }

    User.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        ufirstname: DataTypes.STRING,
        ulastname: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        timestamps: false
    });

    return User;
};