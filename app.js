const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const articlesRouter = require('./routes/articles');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'MongoError' && err.code === 11000) {
    res.status(409).send({ message });
    return;
  }
  res.status(statusCode).send({ message: statusCode === 500 ? 'An error occured on the server' : message });
});

app.listen(3000);
