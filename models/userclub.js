'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserClub extends Model {
        static associate(models) {
            // Only define association if model exists

        }
    }

    UserClub.init({
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        club_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        }
    }, {
        sequelize,
        modelName: 'UserClub',
        tableName: 'userclubs',
        timestamps: false
    });

    return UserClub;
};