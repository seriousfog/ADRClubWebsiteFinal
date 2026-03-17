'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Officer extends Model {
        static associate(models) {
            // Only define association if Club model exists
            if (models.Club) {
                Officer.belongsTo(models.Club, {
                    foreignKey: 'clubin',
                    targetKey: 'clubname'
                });
            }
        }
    }

    Officer.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        officertitle: DataTypes.STRING,
        officerfirstname: DataTypes.STRING,
        officerlastname: DataTypes.STRING,
        clubin: DataTypes.STRING,
        officerstudentid: DataTypes.STRING,
        officergradelevel: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Officer',
        tableName: 'officer',
        timestamps: false
    });

    return Officer;
};