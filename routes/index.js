const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const auth = require('../middlewares/auth');
const { loginUser, createUser } = require('../controllers/users');

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), loginUser);

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

routes.use(auth);
routes.use('/users', usersRouter);
routes.use('/articles', articlesRouter);

module.exports = routes;
