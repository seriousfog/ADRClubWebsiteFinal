const {News} = require('../models');

module.exports.createNews = async function (req, res){
    let clubId = req.params.clubId;
    await News.create({
        news_title: req.body.news_title,
        news_info: req.body.news_info,
        club_id: clubId
    });
    res.redirect(`/clubs/${clubId}`);
}