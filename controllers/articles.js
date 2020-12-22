const Article = require('../models/article');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      if (article) {
        res.send({ data: article });
        return;
      }
      throw new Error('Invalid Data passed to method');
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then((article) => {
      // eslint-disable-next-line eqeqeq
      if (article.owner == req.user._id) {
        Article.findByIdAndDelete(req.params.articleId)
          .then((deletedArticle) => {
            if (deletedArticle) {
              res.send({ data: deletedArticle });
              return;
            }
            throw new Error('Article to be removed was not found');
          })
          .catch(next);
      } else {
        throw new Error('Not authorized to remove article');
      }
    })
    .catch(next);
};
