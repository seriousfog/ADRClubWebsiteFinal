'use strict';
const moment = require('moment');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClubEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ClubEvent.belongsTo(models.Club, {
        foreignKey: 'club_id',
        as: 'club'
      });
    }
  }
  ClubEvent.init({
    eventtitle: DataTypes.STRING,
    eventdescription: DataTypes.STRING,
    eventdate: DataTypes.DATE,
    eventstart: DataTypes.DATE,
    eventend: DataTypes.TIME,
    eventlocation: DataTypes.STRING,
    club_id: DataTypes.BIGINT,
    eventDateBetter: {
      type: DataTypes.VIRTUAL,
      get() {
        let newDate;
        return newDate = moment(this.eventdate).format('h:mmA');
      }
    },
    eventStartBetter: {
      type: DataTypes.VIRTUAL,
      get() {

        let newStart;
        return newStart = moment(this.eventstart).format();

      }
    },
    eventEndBetter: {
      type: DataTypes.VIRTUAL,
      get() {
        let newEnd;
        return newEnd = moment(this.eventend).format('LT');
      }
    }
  },
      {
    sequelize,
    modelName: 'ClubEvent',
    tableName: 'clubevent',
    timestamps: false
  });
  return ClubEvent;
};
