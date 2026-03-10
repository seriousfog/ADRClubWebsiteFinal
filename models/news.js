'use strict';
const moment = require('moment');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.Club, {
        foreignKey: 'club_id',
        as: 'club'
      });
    }
  }
  News.init({
    news_title: DataTypes.STRING,
    news_info: DataTypes.STRING,
    club_id: DataTypes.BIGINT,
    news_on: DataTypes.DATE,
    newsDatedAgo: {
      type: DataTypes.VIRTUAL,
      get(){
        let newsOn = moment(this.news_on);
        let now = moment();
        return moment.duration(newsOn.diff(now)).humanize(true);
      }
    }

  }, {
    sequelize,
    modelName: 'News',
    tableName: 'clubnews',
    timestamps: false
  });
  return News;
};