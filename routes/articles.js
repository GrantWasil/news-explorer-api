const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

articlesRouter.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), getArticles);

articlesRouter.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), createArticle);

articlesRouter.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).required(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), deleteArticle);

module.exports = articlesRouter;
