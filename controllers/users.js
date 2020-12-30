const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { NODE_ENV, JWT_SECRET } = require('../utils/constants');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const InvalidDataError = require('../errors/invalid-data-err');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch(() => next(new NotFoundError('Current user not found')));
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.status(201).send({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch(() => next(new InvalidDataError('Invalid Data passed to method')));
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch(() => next(new NotFoundError('User not found')));
};
