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
    const news = await News.findByPk(req.params.newsId);
    await News.update({
        is_deleted: true
    }, {
        where: {
            id: req.params.newsId
        }
    })

    let clubId = req.params.clubId;
    /*
    let newsId = req.params.newsId;
    await News.destroy({
        where: {
            id: newsId
        }
    });

     */
    res.redirect(`/clubs/${clubId}`);
}

module.exports.deleteComment = async function(req,res){
    const comment = await Comment.findByPk(req.params.commentId);
    await Comment.update({
        is_deleted: true
    }, {
        where: {
            id: req.params.commentId
        }
    });
    res.redirect(`/article/${comment.article_id}`);
}