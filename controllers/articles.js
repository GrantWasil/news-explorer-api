const Article = require('../models/article');
const InvalidDataError = require('../errors/invalid-data-err');
const NotAuthorizedError = require('../errors/not-auth-err');
const NotFoundError = require('../errors/not-found-err');

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
      res.send({ data: article });
    })
    .catch(next(new InvalidDataError('Invalid Data passed to method')));
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
            }
          })
          .catch(next(new NotFoundError('Article to be removed was not found')));
      }
    })
    .catch(next(new NotAuthorizedError('Not authorized to remove article')));
};
