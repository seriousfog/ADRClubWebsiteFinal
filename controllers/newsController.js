const {News} = require('../models');

module.exports.createNews = async function (req, res) {
    let clubId = req.params.clubId;
    await News.create({
        news_title: req.body.news_title,
        news_info: req.body.news_info,
        club_id: clubId,
        news_on: new Date
    });
    res.redirect(`/clubs/${clubId}`);
}

module.exports.deleteNews = async function (req, res){
    let clubId = req.params.clubId;
    let newsId = req.params.newsId;
    await News.destroy({
        where: {
            id: newsId
        }
    });
    res.redirect(`/clubs/${clubId}`);
}
